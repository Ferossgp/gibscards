//https://docs.dynamic.xyz/aa-providers/zerodev#initial-setup
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

export function Web3Provider({
  children,
  clientId
}: {
  children: React.ReactNode;
  clientId: string;
}) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "8ef48e13-66b8-4798-9149-b47d39b9298c",
        walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
      }}
    >
      <ThirdwebProvider
        activeChain={Sepolia}
        clientId={clientId}
      >
        {children}
      </ThirdwebProvider>

    </DynamicContextProvider>
  );
}

