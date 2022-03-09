import { Chatroom__factory } from "../typechain-types";
import { ethers } from "hardhat";

async function main() {
  const factory = (await ethers.getContractFactory(
    "Chatroom"
  )) as Chatroom__factory;
  const vc = await factory.deploy();

  await vc.deployed();

  console.log("Deployed Chatroom to:", vc.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
