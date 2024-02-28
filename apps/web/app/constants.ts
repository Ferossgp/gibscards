import { Address, getAddress, zeroAddress } from "viem";

export const USDC_DECIMALS = 6

const SEPOLIA_GIBSCARD_CONTRACT = getAddress('0xa36E65DdE3892940b69a4CaDE320250fD019E751')
const SEPOLIA_USDC = getAddress('0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238')
export const SEPOLIA_WETH = getAddress('0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9')
const SEPOLIA_NFT_CONTRACT = getAddress("0xE3CCCAcB377D12Edf4000c9DFcDce900B977C50c")
const SEPOLIA_MARKETPLACE_ADDRESS = getAddress('0xc9a422BfCA8fA421CF91f70BEa5a33B69E782314')

const BASE_MARKETPLACE_ADDRESS = zeroAddress
const BASE_NFT_CONTRACT = zeroAddress
const BASE_USDC = zeroAddress
const BASE_GIBSCARD_CONTRACT = zeroAddress

export type SupportedChains = 'sepolia' | 'base'

export const MARKETPLACE_ADDRESSES: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_MARKETPLACE_ADDRESS,
  base: BASE_MARKETPLACE_ADDRESS
}

export const NFT_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_NFT_CONTRACT,
  base: BASE_NFT_CONTRACT
}

export const USDC_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_USDC,
  base: BASE_USDC
}

export const GIBSCARD_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_GIBSCARD_CONTRACT,
  base: BASE_GIBSCARD_CONTRACT
}