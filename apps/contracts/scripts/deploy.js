
const main = async () => {
  // const GibscardsVerifier = await hre.ethers.getContractFactory("Groth16Verifier");
  // const gibscardsVerifier = await GibscardsVerifier.deploy();
  // await gibscardsVerifier.waitForDeployment();
  // console.log("GibscardsVerifier Contract deployed to:", gibscardsVerifier.target);
  // const verifierAddr = gibscardsVerifier.target;

  const verifierAddr = "0x14558c58b92e8f6bb47135ceeec293084d8358c3";

  const Gibscards = await hre.ethers.getContractFactory("Gibscards");
  const gibscards = await Gibscards.deploy(verifierAddr);
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
