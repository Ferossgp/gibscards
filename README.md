# Gibscard

Gibscard is a protocol that enables on-chain gift cards. The global gift card market is currently worth $899.3 billion and is expected to grow to $2.3 trillion by 2030 (*1). We believe that this market can be brought into the web3 world by utilizing the latest advancements in the crypto space, such as Account Abstraction and Zero-Knowledge proofs.

The gift cards usually are used by the average consumer who does not have good technical expertise to use crypto wallets. Because of that, we hide all the complexity under a social login, giving the user a web2 experience while being on-chain.

When a user receives a gift card through our system, they can log in using their email address, and we will create an AA wallet for them. They can then select a product on our website and click on the "Buy" button. On our backend, we will verify the ZK proof to ensure that the user has the right to claim the gift card. We will then convert tokens from USDC to the ticker used on the product they have chosen to buy. Lastly, we will send a gas-less transaction on-chain that executes the Withdraw-Swap-Buy process without the user even noticing all the infrastructure and blockchain layers.

This protocol provides a great advantage for businesses as it enables them to effortlessly release their NFT products into the market and make them available through gift cards. Businesses can earn fees by stacking the gift cards' value until they are claimed or by setting an expiration date on them, which will result in distributing the unclaimed cards to the business owners.

Source:

- [(*1)](https://capitaloneshopping.com/research/gift-card-statistics/)

## Deployed smart contracts

- [Sepolia](https://sepolia.etherscan.io/address/0xfdfD881c3ea054456Dd9BE348EddE8a2c23Ad4bA)
- [Polygon](https://mumbai.polygonscan.com/address/0xfcCD13A74a56EE3CAE2BC15c5319E970B43353CA)
- [Base](https://sepolia.basescan.org/address/0xFFb9c80E8668c75D4c46C7B3443BC838B036549A)
- [Arbitrum](https://sepolia.arbiscan.io/address/0xFFb9c80E8668c75D4c46C7B3443BC838B036549A)

##  Circuits

To run cicuits, go inside the `apps/circuits` folder:

```bash
cd apps/circuits
```

### Install dependencies

```bash
yarn install
```

### Compile circuits and generate and verify the zk-proof using [snarkjs](https://github.com/iden3/snarkjs)

To know how is everything generated, you can see the `executeGroth16.sh` file inside the `gibscards` folder.

To compile and run the circuit, go inside the sudoku folder and run:

Run the first time:

```bash
chmod u+x executeGroth16.sh
```

And after that, you can always run:

```bash
./executeGroth16.sh
```

### Run tests

```bash
yarn test
```

## Contracts

To run contracts, go inside the `apps/contracts` folder:

```bash
cd apps/contracts
```

There are two smart contracts:

- `Gibscards.sol`: withdraw and deposit logic.
- `gibscardsVerifier.sol`: to verify the zk proof (this contract was generated using snarkjs).

### Install dependencies

```bash
yarn install
```

### Deploy

Create a `.env` file and add to it:

```text
PRIVATE_KEY=<yourPrivateKey>
ALICE_PK=<testingPK>
BOB_PK=<testingPK>
```

where `yourPrivateKey` is the private key of your wallet to use for contratct deployment.

To deploy on Sepolia run:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Deploy config also supports base, mumbai and arbitrum networks.

### Run

To make a transactions with Alice and Bob PK using deployed contracts run:

```bash
npx hardhat run scripts/run.js --network sepolia
```

## Frontend

### Install dependencies

```bash
pnpm i
```

### Local development

```bash
pnpm dev
```

### Deploy

Fill all the secrets in the `.dev.vars` file and run:

```bash
pnpm run build && pnpm run deploy
```
