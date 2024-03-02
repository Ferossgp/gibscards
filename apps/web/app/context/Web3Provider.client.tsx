//https://docs.dynamic.xyz/aa-providers/zerodev#initial-setup
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ArbitrumSepolia, BaseSepoliaTestnet, Mumbai, Sepolia } from "@thirdweb-dev/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SupportedChains } from "~/constants";
import { createPublicClient, http } from "viem";
import * as ViemChains from "viem/chains";

const ChainContext = createContext<{
  chain: SupportedChains,
  setChain: (_: SupportedChains) => void
  publicClient: ReturnType<typeof createPublicClient> | null
}>({
  chain: "sepolia",
  setChain: () => { throw new Error("Not implemented") },
  publicClient: null
});

const THIRD_WEB_CHAINS = {
  "sepolia": Sepolia,
  "base": BaseSepoliaTestnet,
  "polygon": Mumbai,
  "arbitrum": ArbitrumSepolia
} as const

export const VIEM_CHAINS = {
  "sepolia": ViemChains.sepolia,
  "base": ViemChains.baseSepolia,
  "polygon": ViemChains.polygonMumbai,
  "arbitrum": ViemChains.arbitrumSepolia
} as const

const RPC_URLS = {
  "sepolia": "https://rpc.sepolia.org",
  "base": "https://sepolia.base.org",
  "polygon": "https://rpc.ankr.com/polygon_mumbai",
  "arbitrum": "https://sepolia-rollup.arbitrum.io/rpc"
} as const

const Providers = ({ children, clientId }: { clientId: string, children: React.ReactNode }) => {
  const { chain } = useActiveChain()
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "8ef48e13-66b8-4798-9149-b47d39b9298c",
        walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
      }}
    >
      <ThirdwebProvider
        activeChain={THIRD_WEB_CHAINS[chain]}
        clientId={clientId}
      >
        {children}
      </ThirdwebProvider>
    </DynamicContextProvider>
  )
}

export function Web3Provider({
  children,
  clientId
}: {
  children: React.ReactNode;
  clientId: string;
}) {
  const [chain, setChain] = useState<SupportedChains>('sepolia');

  const publicClient = useMemo(() => {
    return createPublicClient({
      chain: VIEM_CHAINS[chain],
      transport: http(RPC_URLS[chain]),
    });
  }, [chain]);

  return (
    <ChainContext.Provider value={{
      chain,
      setChain,
      publicClient
    }}>
      <Providers clientId={clientId}>
        {children}
      </Providers>
    </ChainContext.Provider >
  );
}

export function useActiveChain() {
  return useContext(ChainContext);
}