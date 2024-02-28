/* eslint-disable react/prop-types */
import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { parseUnits } from "viem";

import { Networks } from "~/lib/types";
import { getZeroExSwapQuote } from "~/lib/zeroEx";
import { SEPOLIA_USDC, SEPOLIA_WETH, USDC_DECIMALS } from "~/constants";
import { ClientOnly } from "remix-utils/client-only";
import NftGrid from "~/components/nft-view.client";

const key = "__my-key__";


export async function loader({ context, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const secret = url.searchParams.get("s");
  const nullifier = url.searchParams.get("n");

  const { MY_KV, ZERO_EX_API_KEY } =
    context.cloudflare.env;

  const quote = await getZeroExSwapQuote({
    sellAmount: parseUnits("1", USDC_DECIMALS).toString(),
    sellToken: SEPOLIA_USDC,
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
    });
  }

  console.log({ quote: JSON.stringify(quote, null, 2) })

  const swapContext = {
    sellTokenAddress: quote.sellTokenAddress,
    buyTokenAddress: quote.buyTokenAddress,
    allowanceTarget: quote.allowanceTarget,
    to: quote.to,
    data: quote.data.toString(),
  }

  if (id == null || secret == null || nullifier == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext
    });
  }

  const value = await MY_KV.get(key);

  if (value == null) {
    return json({
      status: "error",
      message: "Invalid claim",
      swapContext
    });
  }

  // const nfts = await getNFTsByCollection({ QUICKNODE_NFT_API, contract: SEPOLIA_CONTRACT })

  return json({
    status: "success",
    message: value,
    swapContext
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

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
        <ClientOnly>
          {() => <NftGrid
            status={loaderData.status as "success" | "error"}
            message={loaderData.message}
            swapContext={loaderData.swapContext} />}
        </ClientOnly>
      </div>
    </div>
  );
}