import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useActiveChain } from "~/context/Web3Provider.client";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Loader2 } from "lucide-react";
import { NFT_CONTRACTS } from "~/constants";
import { useSearchParams } from "@remix-run/react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export const ProfileView: React.FC = () => {
  const { chain } = useActiveChain();
  const { primaryWallet } = useDynamicContext();

  const [searchParams] = useSearchParams();
  const isSuccessPurchase = searchParams.get("success") === "true";

  const { contract: nftCollection } = useContract(NFT_CONTRACTS[chain]);
  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    primaryWallet?.address
  );

  useEffect(() => {
    if (!isSuccessPurchase) return;

    const duration = 3000;
    const end = Date.now() + duration;

    function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }

    frame()
  }, [isSuccessPurchase]);

  if (!primaryWallet?.address) {
    return (
      <div className="p-8">
        <h1 className="text-2xl text-center">
          Connect your wallet to view your purchased NFTs
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 relative z-10">
      {isSuccessPurchase && (
        <Dialog defaultOpen>
          <DialogContent>
            <h1 className="text-2xl text-center">🎉</h1>
            <h1 className="text-2xl text-center">
              Congratulations on your purchase!
            </h1>
          </DialogContent>
        </Dialog>
      )}

      {loadingOwnedNfts ? (
        <div>
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {ownedNfts?.map((nft) => (
            <Card key={nft.metadata.id}>
              <CardHeader>
                <img
                  src={nft.metadata.image ?? ""}
                  alt={nft.metadata.name?.toString() ?? ""}
                  className="rounded-2xl"
                />
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-xl">{nft.metadata.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
