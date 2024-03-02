import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useCallback } from "react";
import { SponsorUserOperationReturnType } from '@zerodev/sdk'
import { createWalletClient, custom, getAddress } from "viem";
import { VIEM_CHAINS, useActiveChain } from "~/context/Web3Provider.client";

export function useUserOperation() {
  const { primaryWallet } = useDynamicContext();
  const { chain, publicClient } = useActiveChain();
  return useCallback(async (op: SponsorUserOperationReturnType) => {
    if (!primaryWallet) {
      console.error("No primary wallet");
      return;
    }

    const { connector, address } = primaryWallet;

    // Use the isZeroDevConnector type guard to check for the ZeroDevConnector
    if (!isZeroDevConnector(connector)) {
      console.error("Not a ZeroDev connector");
      const signer = await connector.getSigner();

      const client = createWalletClient({
        chain: VIEM_CHAINS[chain],
        account: getAddress(address),
        transport: custom(signer),
      })

      await client.switchChain({ id: VIEM_CHAINS[chain].id });

      const hash = await client.sendTransaction(op)

      await publicClient?.waitForTransactionReceipt(hash)
      return;
    }

    // Export the ZeroDev ECDSAProvider from the connector
    const ecdsaProvider = connector.getAccountAbstractionProvider();

    if (!ecdsaProvider) {
      return;
    }

    await ecdsaProvider.signMessage("I agree to terms and conditions!");

    const data = await ecdsaProvider.sendUserOperation([op]);

    await ecdsaProvider.waitForUserOperationTransaction(data.hash as `0x${string}`);

    return data
  }, [chain, primaryWallet, publicClient])
}