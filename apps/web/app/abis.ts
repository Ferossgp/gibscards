import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gibscards
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gibscardsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_verifierAddr', internalType: 'address', type: 'address' },
      { name: '_exchangeProxy', internalType: 'address', type: 'address' },
      { name: '_marketplaceAddr', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'commitment',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'denomination',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'nullifierHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: '_owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'commitments',
    outputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'sentAt', internalType: 'uint256', type: 'uint256' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'denomination', internalType: 'uint256', type: 'uint256' },
      { name: 'isUsed', internalType: 'bool', type: 'bool' },
      { name: 'token', internalType: 'contract IERC20', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_commitment', internalType: 'bytes32', type: 'bytes32' },
      { name: '_denomination', internalType: 'uint256', type: 'uint256' },
      { name: 'token', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'exchangeProxy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'marketplaceAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'nullifierHashes',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nftSwapCallData', internalType: 'bytes', type: 'bytes' },
      { name: '_buyToken', internalType: 'contract IERC20', type: 'address' },
    ],
    name: 'swapNFT2',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'verifierAddr',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'a', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: 'b', internalType: 'uint256[2][2]', type: 'uint256[2][2]' },
      { name: 'c', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: 'input', internalType: 'uint256[3]', type: 'uint256[3]' },
    ],
    name: 'verifyProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_proof', internalType: 'uint256[8]', type: 'uint256[8]' },
      { name: '_nullifierHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_commitment', internalType: 'bytes32', type: 'bytes32' },
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: 'swapCallData', internalType: 'bytes', type: 'bytes' },
      { name: '_buyToken', internalType: 'address', type: 'address' },
      { name: 'nftSwapCallData', internalType: 'bytes', type: 'bytes' },
      { name: '_isSWAP', internalType: 'bool', type: 'bool' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Groth16Verifier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const groth16VerifierAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_pA', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: '_pB', internalType: 'uint256[2][2]', type: 'uint256[2][2]' },
      { name: '_pC', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: '_pubSignals', internalType: 'uint256[3]', type: 'uint256[3]' },
    ],
    name: 'verifyProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IVerifier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iVerifierAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'a', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: 'b', internalType: 'uint256[2][2]', type: 'uint256[2][2]' },
      { name: 'c', internalType: 'uint256[2]', type: 'uint256[2]' },
      { name: 'input', internalType: 'uint256[3]', type: 'uint256[3]' },
    ],
    name: 'verifyProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockErc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReentrancyGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const reentrancyGuardAbi = [
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeErc20Abi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'currentAllowance', internalType: 'uint256', type: 'uint256' },
      { name: 'requestedDecrease', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'SafeERC20FailedDecreaseAllowance',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__
 */
export const readGibscards = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"_owner"`
 */
export const readGibscardsOwner = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: '_owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"commitments"`
 */
export const readGibscardsCommitments = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'commitments',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"exchangeProxy"`
 */
export const readGibscardsExchangeProxy = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'exchangeProxy',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"marketplaceAddr"`
 */
export const readGibscardsMarketplaceAddr = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'marketplaceAddr',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"nullifierHashes"`
 */
export const readGibscardsNullifierHashes = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'nullifierHashes',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"verifierAddr"`
 */
export const readGibscardsVerifierAddr = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'verifierAddr',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"verifyProof"`
 */
export const readGibscardsVerifyProof = /*#__PURE__*/ createReadContract({
  abi: gibscardsAbi,
  functionName: 'verifyProof',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gibscardsAbi}__
 */
export const writeGibscards = /*#__PURE__*/ createWriteContract({
  abi: gibscardsAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"deposit"`
 */
export const writeGibscardsDeposit = /*#__PURE__*/ createWriteContract({
  abi: gibscardsAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"swapNFT2"`
 */
export const writeGibscardsSwapNft2 = /*#__PURE__*/ createWriteContract({
  abi: gibscardsAbi,
  functionName: 'swapNFT2',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeGibscardsWithdraw = /*#__PURE__*/ createWriteContract({
  abi: gibscardsAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gibscardsAbi}__
 */
export const simulateGibscards = /*#__PURE__*/ createSimulateContract({
  abi: gibscardsAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"deposit"`
 */
export const simulateGibscardsDeposit = /*#__PURE__*/ createSimulateContract({
  abi: gibscardsAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"swapNFT2"`
 */
export const simulateGibscardsSwapNft2 = /*#__PURE__*/ createSimulateContract({
  abi: gibscardsAbi,
  functionName: 'swapNFT2',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gibscardsAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateGibscardsWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: gibscardsAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link gibscardsAbi}__
 */
export const watchGibscardsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: gibscardsAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link gibscardsAbi}__ and `eventName` set to `"Deposit"`
 */
export const watchGibscardsDepositEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: gibscardsAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link gibscardsAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const watchGibscardsWithdrawalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: gibscardsAbi,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link groth16VerifierAbi}__
 */
export const readGroth16Verifier = /*#__PURE__*/ createReadContract({
  abi: groth16VerifierAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link groth16VerifierAbi}__ and `functionName` set to `"verifyProof"`
 */
export const readGroth16VerifierVerifyProof = /*#__PURE__*/ createReadContract({
  abi: groth16VerifierAbi,
  functionName: 'verifyProof',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const readIerc20 = /*#__PURE__*/ createReadContract({ abi: ierc20Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readIerc20Allowance = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readIerc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: ierc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const writeIerc20 = /*#__PURE__*/ createWriteContract({ abi: ierc20Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeIerc20Approve = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeIerc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__
 */
export const simulateIerc20 = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateIerc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__
 */
export const watchIerc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const readIerc20Metadata = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const readIerc20MetadataAllowance = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc20MetadataBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const readIerc20MetadataDecimals = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const readIerc20MetadataName = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const readIerc20MetadataSymbol = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readIerc20MetadataTotalSupply = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const writeIerc20Metadata = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const writeIerc20MetadataApprove = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const writeIerc20MetadataTransfer = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc20MetadataTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const simulateIerc20Metadata = /*#__PURE__*/ createSimulateContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc20MetadataApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateIerc20MetadataTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const watchIerc20MetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const readIerc20Permit = /*#__PURE__*/ createReadContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readIerc20PermitDomainSeparator = /*#__PURE__*/ createReadContract(
  { abi: ierc20PermitAbi, functionName: 'DOMAIN_SEPARATOR' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const readIerc20PermitNonces = /*#__PURE__*/ createReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const writeIerc20Permit = /*#__PURE__*/ createWriteContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const writeIerc20PermitPermit = /*#__PURE__*/ createWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const simulateIerc20Permit = /*#__PURE__*/ createSimulateContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const simulateIerc20PermitPermit = /*#__PURE__*/ createSimulateContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iVerifierAbi}__
 */
export const readIVerifier = /*#__PURE__*/ createReadContract({
  abi: iVerifierAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iVerifierAbi}__ and `functionName` set to `"verifyProof"`
 */
export const readIVerifierVerifyProof = /*#__PURE__*/ createReadContract({
  abi: iVerifierAbi,
  functionName: 'verifyProof',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const readMockErc20 = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readMockErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readMockErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readMockErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"name"`
 */
export const readMockErc20Name = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readMockErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readMockErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: mockErc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const writeMockErc20 = /*#__PURE__*/ createWriteContract({
  abi: mockErc20Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeMockErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: mockErc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"mint"`
 */
export const writeMockErc20Mint = /*#__PURE__*/ createWriteContract({
  abi: mockErc20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeMockErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: mockErc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeMockErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: mockErc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const simulateMockErc20 = /*#__PURE__*/ createSimulateContract({
  abi: mockErc20Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateMockErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: mockErc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"mint"`
 */
export const simulateMockErc20Mint = /*#__PURE__*/ createSimulateContract({
  abi: mockErc20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateMockErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: mockErc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link mockErc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateMockErc20TransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: mockErc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__
 */
export const watchMockErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: mockErc20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchMockErc20ApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: mockErc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link mockErc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchMockErc20TransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: mockErc20Abi,
    eventName: 'Transfer',
  })
