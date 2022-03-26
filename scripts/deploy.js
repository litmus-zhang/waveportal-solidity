const main = async () => {

    //Create a new  address to deploy the contract
    // const [deployer] = await hre.ethers.getSigners();

    //Get the ETH balance in the address
    // const accountBalance = await deployer.getBalance();


    //Checking the wallet address of the  address 
    // console.log("Deploying contracts with account: ", deployer.address);

    // //Check the account balance and convert it to string
    // console.log("Account balance: ", accountBalance.toString());
  

    //Get the WavePortal  contract from all pool of contrcts on the blockchain 
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");


    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001"),
    });
    await waveContract.deployed();
  
    //Get the contract address
    console.log("WavePortal address: ", waveContract.address);
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