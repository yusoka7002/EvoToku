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

// Contract Address deployed: 0x8aEe7e8C57B30048979599f7Db98c4288C4F3714
// Contract Address verified: https://sepolia.etherscan.io/address/0x8aEe7e8C57B30048979599f7Db98c4288C4F3714#code