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

// Contract Address deployed: 0x4d333394525e03bC55B0c866D11B37CB7a504964
// Contract Address verified: https://sepolia.etherscan.io/address/0x4d333394525e03bC55B0c866D11B37CB7a504964#code
