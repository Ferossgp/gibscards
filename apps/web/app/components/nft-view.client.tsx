/* eslint-disable react/prop-types */
import { useContract, useNFTs, NFT, useValidDirectListings } from "@thirdweb-dev/react";
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
import { SEPOLIA_MARKETPLACE_ADDRESS, SEPOLIA_NFT_CONTRACT } from "~/constants";
import { useUserOperation } from "~/hooks/use-user-op.client";
import { MARKETPLACE_ABI } from "~/abis";

const FAILED_NAME = "Failed to load NFT metadata";

const NftView: React.FC<{ nft: NFT }> = ({ nft }) => {
  const { contract: marketplace } = useContract(
    SEPOLIA_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { primaryWallet } = useDynamicContext()

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: SEPOLIA_NFT_CONTRACT,
      tokenId: nft.metadata.id,
    });

  const sendUserOperation = useUserOperation();

  if (directListing == null && !loadingDirect) {
    return null
  }

  const buyListing = async () => {
    let txResult;
    const listing = directListing?.[0];
    const address = primaryWallet?.address;
    if (listing && address) {
      txResult = encodeFunctionData({
        abi: MARKETPLACE_ABI,
        functionName: "buyFromListing",
        args: [
          BigInt(listing.id),
          getAddress(address),
          1n,
          getAddress(listing.currencyContractAddress),
          BigInt(listing.pricePerToken),
        ]
      })
    } else {
      throw new Error("No valid listing found for this NFT");
    }

    const data = await sendUserOperation([
      {
        data: txResult,
        value: BigInt(0),
        target: SEPOLIA_MARKETPLACE_ADDRESS,
      },
    ]);

    console.log(data);

    return txResult;
  }

  return (
    <Card>
      <CardHeader>
        <img src={nft.metadata.image ?? ""} alt={nft.metadata.name?.toString() ?? ''} className="rounded-2xl" />
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-xl">{nft.metadata.name}</h3>
      </CardContent>

      {directListing == null && loadingDirect ?
        <CardFooter><Loader2 className="w-6 h-6 animate-spin" /></CardFooter> :
        <CardFooter className="justify-between">
          <p className="text-lg">{directListing[0].currencyValuePerToken.displayValue} {directListing[0].currencyValuePerToken.symbol}</p>
          <Button size="sm" onClick={buyListing}>Buy</Button>
        </CardFooter>
      }
    </Card>
  );
};

export default function NftGrid({ loaderData }: { loaderData: any }) {
  const { contract } = useContract(SEPOLIA_NFT_CONTRACT);
  const { data, isLoading } = useNFTs(contract, { count: 10 });

  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-screen pb-8 z-0">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img
            src="/assets/friends.svg"
            alt="Buy gift card"
            className="w-1/3"
          />
        </div>
        <div className="flex flex-col gap-8 relative z-10">
          <pre>{JSON.stringify(loaderData, null, 2)}</pre>
          <h1 className="text-center text-xl">
            {loaderData.value}
          </h1>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {data?.filter((e) => {
                return e.metadata.name !== FAILED_NAME;
              }).map((nft: NFT) => {
                return <NftView key={nft.metadata.id} nft={nft} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}