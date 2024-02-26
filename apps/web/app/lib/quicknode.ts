import QuickNode from "@quicknode/sdk";


export function getNFTsByCollection({
  QUICKNODE_NFT_API,
  contract,
}: {
  QUICKNODE_NFT_API: string;
  contract: string;
}) {
  const core = new QuickNode.Core({
    endpointUrl: QUICKNODE_NFT_API,
    config: {
      addOns: {
        nftTokenV2: true,
      },
    },
  });

  return core.client
    .qn_fetchNFTsByCollection({
      collection: contract,
    })
}
