const main = async () => {
    //Test if the wave function in the contract is accessible by some random walley address
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    //Get Waveportal contract from Waveportal.sol
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    //assign and deploy the contract to another variable
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    //Check if the contract is deployed
    await waveContract.deployed();

    //If deployed === true, log the contract address to the terminal
    console.log("Contract deployed to: ", waveContract.address);
    // console.log("Contract deployed by: ", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)

    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    //Accessing the getTotalWaves function from the Contract
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
    
    //accessing the wave function from the contract
    const waveTxn = await waveContract.wave("A message")
    await waveTxn.wait();
    
    const waveTxn2 = await waveContract.wave("Another message")
    await waveTxn2.wait();

    // const [_, randomPerson] = await hre.ethers.getSigners();
//Connecting random users to access the function wave
// waveTxn = await waveContract.connect(randomPerson).wave("Another Message");
//     await waveTxn.wait();
    
    //Get the Balance left after running wave
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
      );

    //Check if the Number of waves Increased
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    

// Check if the random person actually interacted with the contract
    // waveCount = await waveContract.getTotalWaves();


}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();