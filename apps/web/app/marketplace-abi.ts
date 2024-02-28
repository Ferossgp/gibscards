export const MARKETPLACE_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_listingId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_buyFor",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_quantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expectedTotalPrice",
        type: "uint256",
      },
    ],
    name: "buyFromListing",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;