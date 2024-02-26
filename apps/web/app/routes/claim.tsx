/* eslint-disable react/prop-types */
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useContract, useNFTs, NFT, useValidDirectListings } from "@thirdweb-dev/react";
import { Loader2 } from "lucide-react";
import { encodeAbiParameters, encodeFunctionData, getAddress } from "viem";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { getNFTsByCollection } from "~/lib/quicknode";
import { Networks } from "~/lib/types";
import { getZeroExSwapQuote } from "~/lib/zeroEx";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const key = "__my-key__";
const SEPOLIA_CONTRACT = "0xE3CCCAcB377D12Edf4000c9DFcDce900B977C50c";
const SEPOLIA_MARKETPLACE_ADDRESS = '0xc9a422BfCA8fA421CF91f70BEa5a33B69E782314'
const FAILED_NAME = "Failed to load NFT metadata";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id === null) {
    return json({ value: "No id provided" });
  }

  const { MY_KV, ZERO_EX_API_KEY } =
    context.cloudflare.env;

  const value = await MY_KV.get(key);

  const quote = await getZeroExSwapQuote({
    sellAmount: "1000000",
    sellToken: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    buyTokenAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    slippagePercentage: "0.05",
    networkId: Networks.SEPOLIA,
    apiKey: ZERO_EX_API_KEY,
  })

  // const nfts = await getNFTsByCollection({ QUICKNODE_NFT_API, contract: SEPOLIA_CONTRACT })

  return json({ value, quote });
}

const abi = [{
  inputs: [
    {
      internalType: "uint256",
      name: "_listingId",
      type: "uint256",
    },
    {
      internalType: "address",
      name: "_buyFor",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "_quantity",
      type: "uint256",
    },
    {
      internalType: "address",
      name: "_currency",
      type: "address",
    },
    {
      internalType: "uint256",
      name: "_expectedTotalPrice",
      type: "uint256",
    },
  ],
  name: "buyFromListing",
  outputs: [],
  stateMutability: "payable",
  type: "function",
}] as const

const NftView: React.FC<{ nft: NFT }> = ({ nft }) => {
  const { contract: marketplace } = useContract(
    SEPOLIA_MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { primaryWallet } = useDynamicContext()

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: SEPOLIA_CONTRACT,
      tokenId: nft.metadata.id,
    });



  if (directListing == null && !loadingDirect) {
    return null
  }

  const buyListing = async () => {
    let txResult;
    const listing = directListing?.[0];
    const address = primaryWallet?.address;
    if (listing && address) {
      txResult = encodeFunctionData({
        abi: abi,
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

    console.log(txResult);

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

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const { contract } = useContract(SEPOLIA_CONTRACT);
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
        <div className="flex flex-col gap-4 relative z-10">
          <h1 className="text-center text-3xl font-bold">
            Bro you are the best 💛
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