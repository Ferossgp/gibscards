import { Address, getAddress, zeroAddress } from "viem";

export const USDC_DECIMALS = 6

const SEPOLIA_GIBSCARD_CONTRACT = getAddress('0xfdfD881c3ea054456Dd9BE348EddE8a2c23Ad4bA')
const SEPOLIA_USDC = getAddress('0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238')
export const SEPOLIA_WETH = getAddress('0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9')
export const SEPOLIA_UNI = getAddress('0x1f9840a85d5af5bf1d1762f925bdaddc4201f984')
const SEPOLIA_NFT_CONTRACT = getAddress("0xE3CCCAcB377D12Edf4000c9DFcDce900B977C50c")
const SEPOLIA_MARKETPLACE_ADDRESS = getAddress('0xc9a422BfCA8fA421CF91f70BEa5a33B69E782314')

const BASE_MARKETPLACE_ADDRESS = getAddress('0xD549dD1638E475377290c77eCBA3563dbC507883')
const BASE_NFT_CONTRACT = getAddress('0xF9b39715172D3E2EC7A5cdA86a7b4BA70e4480DC')
const BASE_USDC = getAddress('0x036CbD53842c5426634e7929541eC2318f3dCF7e')
const BASE_GIBSCARD_CONTRACT = zeroAddress

const POLYGON_MARKETPLACE_ADDRESS = getAddress('0x838fAD6e5A2aD1bC359a67175aE6355299F7394A')
const POLYGON_NFT_CONTRACT = getAddress('0xa7f5032b4D042ED478D04Af7379949431684Fc5e')
const POLYGON_USDC = getAddress('0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97')
const POLYGON_GIBSCARD_CONTRACT = getAddress("0xfcCD13A74a56EE3CAE2BC15c5319E970B43353CA")

const ARBITRUM_MARKETPLACE_ADDRESS = getAddress('0xa441B1756923630DB49beE71e45ad0d475F87470')
const ARBITRUM_NFT_CONTRACT = getAddress('0x962379d911D9463BE25cd5aa6808e59A357E303a')
const ARBITRUM_USDC = getAddress('0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d')
const ARBITRUM_GIBSCARD_CONTRACT = zeroAddress

// NOTE: linea
export type SupportedChains = 'sepolia' | 'base' | 'polygon' | 'arbitrum'
export const allChains: SupportedChains[] = ['sepolia', 'base', 'polygon', 'arbitrum']

export const MARKETPLACE_ADDRESSES: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_MARKETPLACE_ADDRESS,
  base: BASE_MARKETPLACE_ADDRESS,
  polygon: POLYGON_MARKETPLACE_ADDRESS,
  arbitrum: ARBITRUM_MARKETPLACE_ADDRESS
}

export const NFT_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_NFT_CONTRACT,
  base: BASE_NFT_CONTRACT,
  polygon: POLYGON_NFT_CONTRACT,
  arbitrum: ARBITRUM_NFT_CONTRACT
}

export const USDC_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_USDC,
  base: BASE_USDC,
  polygon: POLYGON_USDC,
  arbitrum: ARBITRUM_USDC
}

export const GIBSCARD_CONTRACTS: Record<SupportedChains, Address> = {
  sepolia: SEPOLIA_GIBSCARD_CONTRACT,
  base: BASE_GIBSCARD_CONTRACT,
  polygon: POLYGON_GIBSCARD_CONTRACT,
  arbitrum: ARBITRUM_GIBSCARD_CONTRACT
}