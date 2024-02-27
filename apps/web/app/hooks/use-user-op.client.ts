import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useCallback } from "react";
import { SponsorUserOperationReturnType } from '@zerodev/sdk'

export function useUserOperation() {
  const { primaryWallet } = useDynamicContext();

  return useCallback(async (op: SponsorUserOperationReturnType) => {
    if (!primaryWallet) {
      console.error("No primary wallet");
      return;
    }

    const { connector } = primaryWallet;

    // Use the isZeroDevConnector type guard to check for the ZeroDevConnector
    if (!isZeroDevConnector(connector)) {
      console.error("Not a ZeroDev connector");
      return;
    }

    // Export the ZeroDev ECDSAProvider from the connector
    const ecdsaProvider = connector.getAccountAbstractionProvider();

    if (!ecdsaProvider) {
      return;
    }

    return ecdsaProvider.sendUserOperation(op);
  }, [primaryWallet])
}