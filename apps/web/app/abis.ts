export const GIBSCARD_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "denomination",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
];

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
