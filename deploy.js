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

// Contract Address deployed:0x7D56AdB2975Ba30B202E6A2503f64200e5a404c2
// Contract Address verified: https://sepolia.etherscan.io/address/0x7D56AdB2975Ba30B202E6A2503f64200e5a404c2#code