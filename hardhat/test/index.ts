import { BoredVidhanCodeClub__factory } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("BoredVidhanCodeClub", () => {
  it("should mint and transfer an NFT to someone", async function () {
    const factory = (await ethers.getContractFactory(
      "BoredVidhanCodeClub"
    )) as BoredVidhanCodeClub__factory;
    const contract = await factory.deploy();
    await contract.deployed();

    const [recipient] = await ethers.getSigners();

    let balance = await contract.balanceOf(recipient.address);
    expect(balance.toNumber()).to.equal(0);

    const newToken = await contract.mint({
      value: ethers.utils.parseEther("0.5"),
    });

    await newToken.wait();

    balance = await contract.balanceOf(recipient.address);
    expect(balance.toNumber()).to.equal(1);

    expect((await contract.count()).toNumber()).to.equal(1);
  });
});
