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
