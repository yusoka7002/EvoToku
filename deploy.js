const hre = require("hardhat");

async function main() {
  const votingContract = await hre.ethers.getContractFactory("Voting");
  const deployedVotingContract = await votingContract.deploy();

  console.log(`Contract Address deployed: ${deployedVotingContract.target}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Contract Address deployed: 0x10a5Cbb7F4D92BaF73e6C17099F1d1FDCD1e96A1
// Contract Address verified: https://sepolia.etherscan.io/address/0x10a5Cbb7F4D92BaF73e6C17099F1d1FDCD1e96A1#code
