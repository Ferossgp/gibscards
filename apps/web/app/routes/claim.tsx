/* eslint-disable react/prop-types */
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { parseUnits } from "viem";

import { Networks } from "~/lib/types";
import { getZeroExSwapQuote } from "~/lib/zeroEx";
import { SEPOLIA_WETH, USDC_CONTRACTS, USDC_DECIMALS } from "~/constants";
import { ClientOnly } from "remix-utils/client-only";
import NftGrid from "~/components/nft-view.client";
import { GiftCardStored } from "~/types";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const secret = url.searchParams.get("s");

  const { MY_KV, ZERO_EX_API_KEY } = context.cloudflare.env;

  const quote = await getZeroExSwapQuote({
    sellAmount: parseUnits("1", USDC_DECIMALS).toString(),
    sellToken: USDC_CONTRACTS["sepolia"],
    buyTokenAddress: SEPOLIA_WETH,
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

  console.log({ quote: JSON.stringify(quote, null, 2) });

  const swapContext = {
    sellTokenAddress: quote.sellTokenAddress,
    buyTokenAddress: quote.buyTokenAddress,
    allowanceTarget: quote.allowanceTarget,
    to: quote.to,
    data: quote.data?.toString(),
  };

  if (id == null || secret == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext,
      value: null,
    });
  }

  const value = await MY_KV.get(id).then((value) => {
    console.log({ value });
    return value != null ? (JSON.parse(value) as GiftCardStored) : null;
  });

  if (value == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext,
      value: null,
    });
  }

  // const nfts = await getNFTsByCollection({ QUICKNODE_NFT_API, contract: SEPOLIA_CONTRACT })

  return json({
    status: "success",
    message: value.message,
    swapContext,
    value: value,
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const secret = searchParams.get("s");

  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-[90vh] pb-8 z-0">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img
            src="/assets/friends.svg"
            alt="Buy gift card"
            className="w-1/3"
          />
        </div>
        {loaderData.status === "error" ||
          loaderData.value == null ||
          secret == null ? (
          <h1 className="text-center text-xl">{loaderData.message}</h1>
        ) : (
          <ClientOnly>
            {() => (
              <NftGrid
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
