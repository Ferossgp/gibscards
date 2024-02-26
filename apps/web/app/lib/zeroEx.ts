
import {
  Networks,
  ZeroExSwapResponse,
} from './types';

const zeroExUrlMap: { [networkId: number]: string } = {
  [Networks.SEPOLIA]: 'https://sepolia.api.0x.org/swap/v1/quote',
};

const ZERO_EX_API_KEY_HEADER = '0x-api-key';

export function generateQueryPath(url: string, params: {}): string {
  const entries = Object.entries(params);
  if (!entries.length) {
    return url;
  }
  const paramsString = entries.map(
    (kv) => `${kv[0]}=${kv[1]}`,
  ).join('&');
  return `${url}?${paramsString}`;
}

export async function getZeroExSwapQuote({
  sellAmount,
  sellToken,
  buyTokenAddress,
  slippagePercentage,
  networkId,
  apiKey,
}: {
  sellAmount: string,
  sellToken: string,
  buyTokenAddress: string,
  slippagePercentage?: string,
  networkId: number,
  apiKey: string,
}): Promise<ZeroExSwapResponse> {
  return fetch(generateQueryPath(
    zeroExUrlMap[networkId],
    {
      sellAmount,
      sellToken,
      buyToken: buyTokenAddress,
      slippagePercentage,
    }),
    {
      headers: {
        [ZERO_EX_API_KEY_HEADER]: apiKey,
      },
    },
  ).then((res) => res.json() as Promise<ZeroExSwapResponse>)
}

export function validateSlippage(slippage?: string) {
  if (slippage) {
    const slippageBig = Number(slippage);
    if (slippageBig < 0 || slippageBig > 1) {
      throw Error(`Slippage: ${slippage} is not a valid fraction from 0 to 1`);
    }
  }
}