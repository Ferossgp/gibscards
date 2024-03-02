const contracts = {
  sepolia: {
    zeroxproxy: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    marktPlace: "0xc9a422BfCA8fA421CF91f70BEa5a33B69E782314",
  },
  mumbai: {
    zeroxproxy: "0xf471d32cb40837bf24529fcf17418fc1a4807626",
    marktPlace: "0x838fAD6e5A2aD1bC359a67175aE6355299F7394A",
  },
  base: {
    zeroxproxy: "0xdef1c0ded9bec7f1a1670819833240f027b25eff", //mainnet
    marktPlace: "0xD549dD1638E475377290c77eCBA3563dbC507883",
  },
  arbitrum: {
    zeroxproxy: "0xdef1c0ded9bec7f1a1670819833240f027b25eff", //mainnet
    marktPlace: "0xa441B1756923630DB49beE71e45ad0d475F87470",
  },
};

const main = async () => {
  console.log("Deploying contracts on", hre.hardhatArguments.network);

  const network = hre.hardhatArguments.network;
  const { zeroxproxy, marktPlace } = contracts[network];

  const GibscardsVerifier =
    await hre.ethers.getContractFactory("Groth16Verifier");
  const gibscardsVerifier = await GibscardsVerifier.deploy();
  await gibscardsVerifier.waitForDeployment();
  console.log(
    "GibscardsVerifier Contract deployed to:",
    gibscardsVerifier.target
  );
  const verifierAddr = gibscardsVerifier.target;

  const Gibscards = await hre.ethers.getContractFactory("Gibscards");
  const gibscards = await Gibscards.deploy(
    verifierAddr,
    zeroxproxy,
    marktPlace
  );
  await gibscards.waitForDeployment();
  console.log("Gibscards Contract deployed to:", gibscards.target);
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
