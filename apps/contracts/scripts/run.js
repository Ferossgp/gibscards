const { ethers } = require("hardhat");
const { generateDeposit, exportCallDataGroth16 } = require("../lib/utils");
const ERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json");

const alicePK = process.env.ALICE_PK;
const bobPK = process.env.BOB_PK;

const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const denomination = "500000";
const rcpUrl = "https://rpc.sepolia.org";
const gibscardsAddress = "0xfdfD881c3ea054456Dd9BE348EddE8a2c23Ad4bA";
const uniToken = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";

async function approveToken(alice) {
  const token = new ethers.Contract(tokenAddress, ERC20.abi, alice);
  const approveTx = await token.approve(gibscardsAddress, 100000000);
  await approveTx.wait();
}

async function makeDeposit(alice, deposit, gibscards) {
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

  await approveToken(alice);
  await makeDeposit(alice, deposit, gibscards);
  const proofData = await getProof(deposit, bob);

  const withdrawTx = await gibscards.connect(bob).withdraw(
    proofData,
    deposit.nullifierHex,
    deposit.commitmentHex,
    bob.address,
    "0x415565b00000000000000000000000001c7d4b196cb0c7b01d743fbc6116a902379c72380000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f984000000000000000000000000000000000000000000000000000000000007a12000000000000000000000000000000000000000000000000000200a26f91da3e000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000380000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c7d4b196cb0c7b01d743fbc6116a902379c72380000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000007a120000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e6973776170563300000000000000000000000000000000000000000000000000000000000000000000000007a12000000000000000000000000000000000000000000000000000200a26f91da3e0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000003bfa4769fb09eefc5a80d6e87c3b9c650f7ae48e0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000421c7d4b196cb0c7b01d743fbc6116a902379c7238002710fff9976782d46cc05630d1f6ebab18b2324d6b14000bb81f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001c7d4b196cb0c7b01d743fbc6116a902379c7238000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd0000000000000000000000001000000000000000000000000000000000000011000000000000000000000000000000007b9644eadfa9a6153789a9885d0aa013"

    ,uniToken,
    "0x704232dc000000000000000000000000000000000000000000000000000000000000000600000000000000000000000029369c3e2d9ec68f6f900c27de3efb161133cde700000000000000000000000000000000000000000000000000000000000000010000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000000000000000000000000000000005af3107a4000"

    ,true
  );

  await withdrawTx.wait();
  console.log(withdrawTx);

  // const nftTx = await gibscards.swapNFT(
  //   "0x704232dc0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000ab91b572267cbc4f87ee54b97d4c8b0d4b9a6e2300000000000000000000000000000000000000000000000000000000000000010000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000000000000000000000000000000005af3107a4000"

  //   , uniToken,
  //   {
  //     gasLimit: 10000000,
  //   }
  //   );

  // await nftTx.wait();
  // console.log(nftTx);
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
