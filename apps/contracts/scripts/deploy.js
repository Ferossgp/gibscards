const main = async () => {
  // const GibscardsVerifier = await hre.ethers.getContractFactory("Groth16Verifier");
  // const gibscardsVerifier = await GibscardsVerifier.deploy();
  // await gibscardsVerifier.waitForDeployment();
  // console.log("GibscardsVerifier Contract deployed to:", gibscardsVerifier.target);
  // const verifierAddr = gibscardsVerifier.target;

  const verifierAddr = "0x14558c58b92e8f6bb47135ceeec293084d8358c3";
  const zeroxproxy = "0xdef1c0ded9bec7f1a1670819833240f027b25eff";
  const marktPlace = "0xc9a422BfCA8fA421CF91f70BEa5a33B69E782314";

  const Gibscards = await hre.ethers.getContractFactory("Gibscards");
  const gibscards = await Gibscards.deploy(verifierAddr, zeroxproxy, marktPlace);
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
