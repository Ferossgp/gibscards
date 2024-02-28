import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useActionData, useSubmit } from "@remix-run/react";
import {
  SEPOLIA_GIBSCARD_CONTRACT,
  SEPOLIA_USDC,
  USDC_DECIMALS,
} from "~/constants";
import {
  Client,
  CustomTransport,
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  getAddress,
  http,
  parseUnits,
} from "viem";
import { gibscardsAbi, ierc20Abi } from "~/abis";
import { generateDeposit } from "~/lib/zk";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { sepolia } from "viem/chains";
import { match } from "ts-pattern";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://rpc.sepolia.org"),
});

const VALUES = [1, 5, 10, 15];
export default function CreateView() {
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const submit = useSubmit();
  const data = useActionData();
  const { primaryWallet } = useDynamicContext();
  const [client, setClient] = useState<Client<
    CustomTransport,
    typeof sepolia,
    { address: `0x${string}`; type: "json-rpc" }
  > | null>(null);
  const [step, setStep] = useState("idle");
  useEffect(() => {
    const init = async () => {
      if (primaryWallet == null) return;

      const { address, connector } = primaryWallet;

      if (connector == null || address == null) return;
      const signer = await connector.getSigner();

      setClient(
        createWalletClient({
          chain: sepolia,
          account: getAddress(address),
          transport: custom(signer),
        })
      );
    };
    init();
  }, [primaryWallet]);

  const onSubmit = async () => {
    if (!selected || !client) return;
    setStep("loading");
    const deposit = await generateDeposit();

    // const proof = await generateWithdrawProof({
    //   nullifierHex: deposit.nullifierHex,
    //   commitmentHex: deposit.commitmentHex,
    //   nullifier: deposit.nullifier.toString(),
    //   secret: deposit.secret.toString()
    // }, "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238");
    setStep("approving");

    const approve = await client.sendTransaction({
      data: encodeFunctionData({
        abi: ierc20Abi,
        functionName: "approve",
        args: [
          SEPOLIA_GIBSCARD_CONTRACT,
          parseUnits(selected.toString(), USDC_DECIMALS),
        ],
      }),
      to: SEPOLIA_USDC,
    });

    await publicClient.waitForTransactionReceipt({ hash: approve });

    setStep("sending");

    const data = await client.sendTransaction({
      data: encodeFunctionData({
        abi: gibscardsAbi,
        functionName: "deposit",
        args: [
          deposit.commitmentHex as `0x${string}`,
          parseUnits(selected.toString(), USDC_DECIMALS),
          SEPOLIA_USDC,
        ],
      }),
      to: SEPOLIA_GIBSCARD_CONTRACT,
    });

    const formData = new FormData();
    formData.append("message", message);
    formData.append("hash", data || "");
    formData.append("value", selected?.toString() || "");
    formData.append("deposit", JSON.stringify(deposit));

    return;
    submit(formData, { method: "post" });
  };

  if (data) {
    return <div>Success {data.cardId}</div>;
  }

  return (
    <div className="flex flex-col gap-8 relative z-10">
      <h1 className="text-center text-3xl font-bold">Buy a Gift Card</h1>
      <Textarea
        placeholder="Leave a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="grid grid-cols-2 items-ceter px-4">
        <div className="flex gap-4 items-center">
          {VALUES.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={selected === value ? "default" : "secondary"}
              selected={selected === value}
              onClick={(e) => {
                e.preventDefault();
                setSelected(value);
              }}
            >
              ${value}
            </Button>
          ))}
        </div>
        <Button onClick={onSubmit} disabled={primaryWallet == null}>
          {match(primaryWallet == null ? "connect" : step)
            .with("connect", () => "Connect Wallet")
            .with("loading", () => "Loading...")
            .with("approving", () => "Approving...")
            .with("sending", () => "Purchasing...")
            .otherwise(() => "Purchase Gibscard")}
        </Button>
      </div>
    </div>
  );
}
