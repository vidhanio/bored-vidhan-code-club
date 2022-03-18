import { BoredVidhanCodeClub__factory } from "../typechain";
import { ethers } from "hardhat";

async function main() {
  const bvccFactory = (await ethers.getContractFactory(
    "BoredVidhanCodeClub"
  )) as BoredVidhanCodeClub__factory;

  console.log("Deploying BoredVidhanCodeClub...");
  const bvcc = await bvccFactory.deploy();

  console.log("Waiting for BoredVidhanCodeClub to be deployed...");
  await bvcc.deployed();

  console.log("Deployed BoredVidhanCodeClub to:", bvcc.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
