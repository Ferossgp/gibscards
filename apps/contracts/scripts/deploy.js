const main = async () => {
    const GibscardsVerifier = await hre.ethers.getContractFactory("GibscardsVerifier");
    const gibscardsVerifier = await GibscardsVerifier.deploy();
    await gibscardsVerifier.waitForDeployment();
    console.log("GibscardsVerifier Contract deployed to:", gibscardsVerifier.target);
  
    const Gibscards = await hre.ethers.getContractFactory("Gibscards");
    const gibscards = await Gibscards.deploy(gibscardsVerifier.target);
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
  