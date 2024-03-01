/* eslint-disable react/prop-types */
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { parseUnits } from "viem";

import { Networks } from "~/lib/types";
import { getZeroExSwapQuote } from "~/lib/zeroEx";
import {
  NFT_CONTRACTS,
  SEPOLIA_UNI,
  USDC_CONTRACTS,
  USDC_DECIMALS,
} from "~/constants";
import { ClientOnly } from "remix-utils/client-only";
import NftGrid from "~/components/nft-view.client";
import { GiftCardStored } from "~/types";
import { getNFTsByCollection } from "~/lib/quicknode";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const secret = url.searchParams.get("s");

  if (id == null || secret == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext: null,
      value: null,
    });
  }

  const { MY_KV, ZERO_EX_API_KEY, QUICKNODE_NFT_API } = context.cloudflare.env;

  const value = await MY_KV.get(id).then((value) => {
    return value != null ? (JSON.parse(value) as GiftCardStored) : null;
  });

  if (value == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext: null,
      value: null,
    });
  }

  const quote = await getZeroExSwapQuote({
    sellAmount: parseUnits(value.value, USDC_DECIMALS).toString(),
    sellToken: USDC_CONTRACTS["sepolia"],
    buyTokenAddress: SEPOLIA_UNI,
    slippagePercentage: "0.05",
    networkId: Networks.SEPOLIA,
    apiKey: ZERO_EX_API_KEY,
  }).catch((e) => {
    console.error(e);
    return null;
  });

  if (quote == null) {
    return json({
      status: "error",
      message: "Failed to get swap quote",
      value: null,
    });
  }

  const swapContext = {
    sellTokenAddress: quote.sellTokenAddress,
    buyTokenAddress: quote.buyTokenAddress,
    allowanceTarget: quote.allowanceTarget,
    to: quote.to,
    data: quote.data?.toString(),
  };

  const resp = await getNFTsByCollection({
    QUICKNODE_NFT_API,
    contract: NFT_CONTRACTS["sepolia"],
  });

  const nfts = resp?.tokens?.map((nft) => {
    return {
      id: nft.collectionTokenId,
      name: nft.name,
      image: nft.imageUrl,
    };
  });

  return json({
    status: "success",
    message: value.message,
    swapContext,
    nfts: nfts,
    value: value,
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const secret = searchParams.get("s");
  const id = searchParams.get("id");

  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-[90vh] pb-8 z-0">
      <div className="p-8 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img
            src="/assets/friends.svg"
            alt="Buy gift card"
            className="w-1/3"
          />
        </div>
        {secret == null || id == null ? (
          <form
            className="relative z-10"
            onSubmit={(evt) => {
              evt.preventDefault();
              try {
                const value = new URL(evt.target.url?.value);

                const params = new URLSearchParams();
                params.append("id", value.searchParams.get("id") as string);
                params.append("s", value.searchParams.get("s") as string);

                setSearchParams(params);
              } catch (e) {
                toast.error("Invalid URL");
              }
            }}
          >
            <Input name="url" placeholder="Enter your claim link here" />
          </form>
        ) : loaderData.status === "error" ||
          loaderData.value == null ||
          secret == null ? (
          <h1 className="text-center text-xl">{loaderData.message}</h1>
        ) : (
          <ClientOnly>
            {() => (
              <NftGrid
                tokens={loaderData.nfts}
                swapContext={loaderData.swapContext}
                value={loaderData.value}
                secret={secret}
              />
            )}
          </ClientOnly>
        )}
      </div>
    </div>
  );
}
