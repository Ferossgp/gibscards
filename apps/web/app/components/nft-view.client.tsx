/* eslint-disable react/prop-types */
import {
  useContract,
  useNFTs,
  NFT,
  useValidDirectListings,
} from "@thirdweb-dev/react";
import { Loader2 } from "lucide-react";
import { encodeFunctionData, getAddress } from "viem";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { MARKETPLACE_ADDRESSES, NFT_CONTRACTS } from "~/constants";
import { useUserOperation } from "~/hooks/use-user-op.client";
import { MARKETPLACE_ABI } from "~/marketplace-abi";
import { useActiveChain } from "~/context/Web3Provider.client";
import { GiftCardStored } from "~/types";
import { generateWithdrawProof } from "~/lib/zk";

const FAILED_NAME = "Failed to load NFT metadata";

const NftView: React.FC<{
  nft: NFT;
  swapData?: string;
  nullifier: string;
  secret: string;
  nullifierHex: string;
  commitmentHex: string;
}> = ({ nft, swapData, nullifier, secret, nullifierHex, commitmentHex }) => {
  const { chain } = useActiveChain();

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESSES[chain],
    "marketplace-v3"
  );

  const { primaryWallet } = useDynamicContext();

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_CONTRACTS[chain],
      tokenId: nft.metadata.id,
    });

  const sendUserOperation = useUserOperation();

  if (directListing == null && !loadingDirect) {
    return null;
  }

  const buyListing = async () => {
    let buyData;
    const listing = directListing?.[0];
    const address = primaryWallet?.address;

    if (listing && address) {
      buyData = encodeFunctionData({
        abi: MARKETPLACE_ABI,
        functionName: "buyFromListing",
        args: [
          BigInt(listing.id),
          getAddress(address),
          1n,
          getAddress(listing.currencyContractAddress),
          BigInt(listing.pricePerToken),
        ],
      });
    } else {
      throw new Error("No valid listing found for this NFT");
    }

    const recipient = address // Keep the gibscard contract
    const proof = await generateWithdrawProof({
      nullifierHex: nullifierHex,
      commitmentHex: commitmentHex,
      nullifier: nullifier,
      secret: secret
    }, recipient)

    console.log(buyData, swapData, nullifier, proof);

    const data = await sendUserOperation([
      {
        data: buyData,
        value: BigInt(0),
        target: MARKETPLACE_ADDRESSES[chain],
      },
    ]);

    console.log(data);
  };

  return (
    <Card>
      <CardHeader>
        <img
          src={nft.metadata.image ?? ""}
          alt={nft.metadata.name?.toString() ?? ""}
          className="rounded-2xl"
        />
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-xl">{nft.metadata.name}</h3>
      </CardContent>

      {directListing == null && loadingDirect ? (
        <CardFooter>
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardFooter>
      ) : (
        <CardFooter className="justify-between">
          <p className="text-lg">
            {directListing[0].currencyValuePerToken.displayValue}{" "}
            {directListing[0].currencyValuePerToken.symbol}
          </p>
          <Button size="sm" onClick={buyListing}>
            Buy
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default function NftGrid({
  value,
  swapContext,
  secret,
}: {
  value: GiftCardStored;
  secret: string;
  swapContext?: {
    data: string;
  };
}) {
  const { chain } = useActiveChain();
  const { contract } = useContract(NFT_CONTRACTS[chain]);
  const { data, isLoading } = useNFTs(contract, { count: 10 });

  return (
    <div className="flex flex-col gap-8 relative z-10">
      <div>
        <p className="text-neutral-700 uppercase text-center">
          Card value: ${value.value}
        </p>
        <h1 className="text-center text-xl">{value.message}</h1>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {data
            ?.filter((e) => {
              return e.metadata.name !== FAILED_NAME;
            })
            .map((nft: NFT) => {
              return (
                <NftView
                  key={nft.metadata.id}
                  nft={nft}
                  swapData={swapContext?.data}
                  secret={secret}
                  nullifier={value.nullifier}
                  nullifierHex={value.nullifierHex}
                  commitmentHex={value.commitmentHex}
                />
              );
            })}
        </div>
      )}
    </div>
  );
}
