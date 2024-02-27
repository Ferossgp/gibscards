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
  const { MY_KV, ZERO_EX_API_KEY } =
    context.cloudflare.env;

  const quote = await getZeroExSwapQuote({
    sellAmount: parseUnits("1", USDC_DECIMALS).toString(),
    sellToken: SEPOLIA_USDC,
    buyTokenAddress: SEPOLIA_WETH,
    slippagePercentage: "0.05",
    networkId: Networks.SEPOLIA,
    apiKey: ZERO_EX_API_KEY,
  })
  console.log({ quote: JSON.stringify(quote, null, 2) })

  const swapContext = {
    sellTokenAddress: quote.sellTokenAddress,
    buyTokenAddress: quote.buyTokenAddress,
    allowanceTarget: quote.allowanceTarget,
    to: quote.to,
    data: quote.data,
  }

  if (id === null) {
    return json({ value: "No id provided", swapContext });
  }

  const value = await MY_KV.get(key);

  // const nfts = await getNFTsByCollection({ QUICKNODE_NFT_API, contract: SEPOLIA_CONTRACT })

  return json({ value, swapContext });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <ClientOnly>
      {() => <NftGrid loaderData={loaderData} />}
    </ClientOnly>
  );
}