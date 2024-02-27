const { ethers } = require("hardhat");
const {
  generateDeposit,
  exportCallDataGroth16,
  createDeposit,
} = require("../lib/utils");
const ERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const alicePK = process.env.ALICE_PK;
const bobPK = process.env.BOB_PK;

const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const denomination = "1";
const rcpUrl = "https://rpc.ankr.com/eth_sepolia";

const main = async () => {
  // const GibscardsVerifier = await ethers.getContractFactory("Groth16Verifier");
  // const gibscardsVerifier = await GibscardsVerifier.deploy();
  // await gibscardsVerifier.waitForDeployment();
  // console.log("GibscardsVerifier Contract deployed to:", gibscardsVerifier.target);

  // const Gibscards = await ethers.getContractFactory("Gibscards");
  // const gibscards = await Gibscards.deploy(gibscardsVerifier);
  // await gibscards.waitForDeployment();
  // const gibscardsAddress = gibscards.target;
  // console.log("Gibscards Contract deployed to:", gibscardsAddress);

  const provider = new ethers.JsonRpcProvider(rcpUrl);

  const alice = new ethers.Wallet(alicePK, provider);
  const bob = new ethers.Wallet(bobPK, provider);

  const gibscardsAddress = "0xa36E65DdE3892940b69a4CaDE320250fD019E751";

  const gibscards = await ethers.getContractAt(
    "Gibscards",
    gibscardsAddress,
    alice
  );

  // const deposit = await generateDeposit();

  const nullifier = BigInt(
    "248233066445375946265781730296438129711501373235049205070451601369055133267"
  );
  const secret = BigInt(
    "107424424118356401700382316670689029594234930858450108832039312150436898547"
  );
  const deposit = await createDeposit({ nullifier, secret });
  console.log(deposit);

  // const token = new ethers.Contract(tokenAddress, ERC20.abi, alice);
  // const a = await token.approve(gibscardsAddress, 100000000);
  // await a.wait();

  // const tx = await gibscards
  //   .connect(alice)
  //   .deposit(deposit.commitmentHex, denomination, tokenAddress, {
  //     gasLimit: 10000000,
  //   });
  // await tx.wait();
  // console.log(tx);

  const input = {
    nullifierHash: deposit.nullifierHash,
    commitmentHash: deposit.commitment,
    recipient: bob.address,
    nullifier: deposit.nullifier,
    secret: deposit.secret,
  };
  const wasm = "./zkproof/gibscards.wasm";
  const zkey = "./zkproof/gibscards_final.zkey";

  let { a, b, c, Input, proofData } = await exportCallDataGroth16(
    input,
    wasm,
    zkey
  );

  console.log(proofData);

  let result = await gibscards.verifyProof(a, b, c, Input);
  console.log("Proof valid?: ", result);

  const withdrawTx = await gibscards
    .connect(bob)
    .withdraw(
      proofData,
      deposit.nullifierHex,
      deposit.commitmentHex,
      bob.address
    );

  await withdrawTx.wait();
  console.log(withdrawTx);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
