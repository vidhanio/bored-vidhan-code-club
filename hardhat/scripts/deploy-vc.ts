import { VidhanChat__factory } from "../typechain";
import { ethers } from "hardhat";

async function main() {
  const vcFactory = (await ethers.getContractFactory(
    "VidhanChat"
  )) as VidhanChat__factory;
  const vc = await vcFactory.deploy();

  await vc.deployed();

  console.log("Deployed VidhanChat to:", vc.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
