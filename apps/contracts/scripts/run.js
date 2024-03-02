const { ethers } = require("hardhat");
const { generateDeposit, exportCallDataGroth16 } = require("../lib/utils");
const ERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const alicePK = process.env.ALICE_PK;
const bobPK = process.env.BOB_PK;

const denomination = "500000";

const config = {
  sepolia: {
    rcpUrl: "https://rpc.sepolia.org/",
    gibscardsAddress: "0xfdfD881c3ea054456Dd9BE348EddE8a2c23Ad4bA",
    uniToken: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    usdcToken: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  },
  mumbai: {
    rcpUrl: "https://rpc.ankr.com/polygon_mumbai/",
    gibscardsAddress: "0xfcCD13A74a56EE3CAE2BC15c5319E970B43353CA",
    usdcToken: "0x9999f7fea5938fd3b1e26a12c3f2fb024e194f97",
    // uniToken: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  },
};

async function approveToken(alice, tokenAddress) {
  const token = new ethers.Contract(tokenAddress, ERC20.abi, alice);
  const approveTx = await token.approve(gibscardsAddress, 100000000);
  await approveTx.wait();
}

async function makeDeposit(alice, deposit, gibscards, tokenAddress) {
  const tx = await gibscards
    .connect(alice)
    .deposit(deposit.commitmentHex, denomination, tokenAddress, {
      gasLimit: 10000000,
    });
  await tx.wait();
  console.log(tx);
}

async function getProof(deposit, bob) {
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

  return proofData;
}

const main = async () => {
  const provider = new ethers.JsonRpcProvider(rcpUrl);
  const alice = new ethers.Wallet(alicePK, provider);
  const bob = new ethers.Wallet(bobPK, provider);
  const { gibscardsAddress, uniToken, usdcToken } = config.mumbai;

  const gibscards = await ethers.getContractAt(
    "Gibscards",
    gibscardsAddress,
    alice
  );

  const deposit = await generateDeposit();
  console.log(deposit);

  // const nullifier = BigInt(
  //   "248233066445375946265781730296438129711501373235049205070451601369055133267"
  // );
  // const secret = BigInt(
  //   "107424424118356401700382316670689029594234930858450108832039312150436898547"
  // );
  // const deposit = await createDeposit({ nullifier, secret });

  // let result = await gibscards.verifyProof(a, b, c, Input);
  // console.log("Proof valid?: ", result);

  await approveToken(alice, usdcToken);
  await makeDeposit(alice, deposit, gibscards, usdcToken);
  const proofData = await getProof(deposit, bob);

  const withdrawTx = await gibscards.connect(bob).withdraw(
    proofData,
    deposit.nullifierHex,
    deposit.commitmentHex,
    bob.address,
    "",
    uniToken,
    "",
    true
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
