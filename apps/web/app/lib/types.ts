
export interface ZeroExSwapResponse {
  guaranteedPrice: string,
  to: string,
  data: Buffer,
  value: string,
  buyAmount: string,
  sellAmount: string,
  buyTokenAddress: string,
  sellTokenAddress: string,
  allowanceTarget: string,
}

export const Networks = {
  SEPOLIA: 11155111,
};