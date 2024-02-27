const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  generateDeposit,
  exportCallDataGroth16,
} = require("../lib/utils");

const parseEther = (v) => ethers.parseEther(v);

describe("Test", function () {
  let verifier, gibscards, gibscardsAddress, alice, bob, token, tokenAddress;

  before(async function () {
    const VerifierFactory = await ethers.getContractFactory("Groth16Verifier");
    verifier = await VerifierFactory.deploy();
    await verifier.waitForDeployment();

    const Factory = await ethers.getContractFactory("Gibscards");
    gibscards = await Factory.deploy(verifier.target);
    await gibscards.waitForDeployment();

    gibscardsAddress = gibscards.target;

    [alice, bob] = await ethers.getSigners();

    const MockERC20Factory = await ethers.getContractFactory("MockErc20");
    token = await MockERC20Factory.deploy();
    await token.waitForDeployment();
    tokenAddress = token.target;
  });

  it("Deposit", async function () {
    const deposit = await generateDeposit();
    const denomination = parseEther("100");

    await token.connect(alice).mint(alice.address, parseEther("100"));
    //wrong denomination
    await expect(
      gibscards
        .connect(alice)
        .deposit(deposit.commitmentHex, parseEther("0"), tokenAddress)
    ).to.be.reverted;

    await token.connect(alice).approve(gibscardsAddress, denomination);

    const tx = await gibscards
      .connect(alice)
      .deposit(deposit.commitmentHex, denomination, tokenAddress);

    const aliceBalance = await token.balanceOf(alice.address);
    const contractBalance = await token.balanceOf(gibscardsAddress);

    expect(aliceBalance).to.equal(parseEther("0"));
    expect(contractBalance).to.equal(denomination);
  });

  it("Withdraw", async function () {
    const deposit = await generateDeposit();
    const denomination = parseEther("100");
    await token.connect(alice).mint(alice.address, parseEther("100"));
    await token.connect(alice).approve(gibscardsAddress, denomination);
    await gibscards
      .connect(alice)
      .deposit(deposit.commitmentHex, denomination, tokenAddress);

    const input = {
      nullifierHash: deposit.nullifierHash,
      commitmentHash: deposit.commitment,
      recipient: bob.address,
      nullifier: deposit.nullifier,
      secret: deposit.secret,
    };
    const wasm = "./zkproof/gibscards.wasm";
    const zkey = "./zkproof/gibscards_final.zkey";

    let dataResult = await exportCallDataGroth16(input, wasm, zkey);

    let result = await gibscards.verifyProof(
      dataResult.a,
      dataResult.b,
      dataResult.c,
      dataResult.Input
    );

    expect(result).to.equal(true);

    const tx = await gibscards
      .connect(bob)
      .withdraw(
        dataResult.proofData,
        deposit.nullifierHex,
        deposit.commitmentHex,
        bob.address
      );
    
    const bobBalance = await token.balanceOf(bob.address);
    const contractBalance = await token.balanceOf(gibscardsAddress);

    expect(bobBalance).to.equal(denomination);
    // expect(contractBalance).to.equal(parseEther("0"));
  });
});
