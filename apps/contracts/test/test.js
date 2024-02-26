const { expect } = require("chai");
const { ethers } = require("hardhat");
const { generateDeposit, generateComitment } = require("./utils/utils");

const parseEther = (v) => ethers.parseEther(v);

describe("Test", function () {
  let verifier, gibscards, gibscardsAddress, alice, bob, token, tokenAddress;

  before(async function () {
    const VerifierFactory = await ethers.getContractFactory("GibscardsVerifier");
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

    await token.connect(alice).mint(alice.address, parseEther("100"));
  });

  it("Should create ERC20 deposit", async function () {
    const deposit = await generateDeposit();
    const denomination = parseEther("100");

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
});
