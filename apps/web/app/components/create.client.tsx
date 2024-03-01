import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useActionData, useSubmit } from "@remix-run/react";
import { GIBSCARD_CONTRACTS, USDC_CONTRACTS, USDC_DECIMALS } from "~/constants";
import {
  Chain,
  Client,
  CustomTransport,
  JsonRpcAccount,
  createWalletClient,
  custom,
  encodeFunctionData,
  getAddress,
  parseUnits,
} from "viem";
import { gibscardsAbi, ierc20Abi } from "~/abis";
import { generateDeposit, generateWithdrawProof } from "~/lib/zk";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { sepolia } from "viem/chains";
import { match } from "ts-pattern";
import { VIEM_CHAINS, useActiveChain } from "~/context/Web3Provider.client";
import QRCode from "react-qr-code";

type EthereumProvider = { request(...args: any): Promise<any> };

const VALUES = [1, 5, 10, 15];
export default function CreateView() {
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<number | null>(null);
  const submit = useSubmit();
  const data = useActionData<{ cardId: string; url: string }>();
  const { primaryWallet } = useDynamicContext();
  const [client, setClient] = useState<Client<
    CustomTransport,
    Chain,
    JsonRpcAccount<`0x${string}`>
  > | null>(null);
  const [step, setStep] = useState("idle");

  const { publicClient, chain } = useActiveChain();

  useEffect(() => {
    const init = async () => {
      if (primaryWallet == null) return;

      const { address, connector } = primaryWallet;
      if (connector == null || address == null) return;
      const signer = await connector.getSigner();

      setClient(
        createWalletClient({
          chain: VIEM_CHAINS[chain],
          account: getAddress(address),
          transport: custom(signer as EthereumProvider),
        })
      );
    };
    init();
  }, [chain, primaryWallet]);

  const onSubmit = async () => {
    if (!selected || !client || !publicClient) return;
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
          GIBSCARD_CONTRACTS[chain],
          parseUnits(selected.toString(), USDC_DECIMALS),
        ],
      }),
      to: USDC_CONTRACTS[chain],
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
          USDC_CONTRACTS[chain],
        ],
      }),
      to: GIBSCARD_CONTRACTS[chain],
    });

    const formData = new FormData();
    formData.append("message", message);
    formData.append("hash", data || "");
    formData.append("value", selected?.toString() || "");
    formData.append("secret", deposit.secret.toString());
    formData.append("nullifier", deposit.nullifier.toString());
    formData.append("nullifierHex", deposit.nullifierHex);
    formData.append("commitmentHex", deposit.commitmentHex);

    submit(formData, { method: "post" });
  };

  if (data) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 z-10 relative">
        <h1 className="text-center text-3xl font-bold">
          Success! Your order id: #{data.cardId}
        </h1>
        <div className="p-4 bg-white rounded-xl">
          <a className="text-base" href={data.url}>{data.url}</a>
        </div>
        <div className="bg-white rounded-xl border-2 border-[#border-neutral-900] p-4">
          <QRCode value={data.url} />
        </div>
      </div>
    );
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
