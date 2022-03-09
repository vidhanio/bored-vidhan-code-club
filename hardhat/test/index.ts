import {
  BoredVidhanCodeClub__factory,
  VidhanChatroom__factory,
} from "../typechain-types";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("BoredVidhanCodeClub", () => {
  it("should mint and transfer an NFT to someone", async function () {
    const factory = (await ethers.getContractFactory(
      "BoredVidhanCodeClub"
    )) as BoredVidhanCodeClub__factory;
    const contract = await factory.deploy();
    await contract.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.png";

    let balance = await contract.balanceOf(recipient);
    expect(balance.toNumber()).to.equal(0);

    const newToken = await contract.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.5"),
    });

    await newToken.wait();

    balance = await contract.balanceOf(recipient);
    expect(balance.toNumber()).to.equal(1);

    expect(await contract.isContentOwned(metadataURI)).to.equal(true);
  });
});

describe("VidhanChatroom", () => {
  it("should send messages", async function () {
    const factory = (await ethers.getContractFactory(
      "VidhanChatroom"
    )) as VidhanChatroom__factory;
    const contract = await factory.deploy();
    await contract.deployed();

    const [from, to] = await ethers.getSigners();
    const message = "Hello, world!";

    const join = await contract.connect(from).join();
    await join.wait();

    const join2 = await contract.connect(to).join();
    await join2.wait();

    const send = await contract.connect(from).send(to.address, message);
    await send.wait();

    const messages = await contract.getMessages(to.address);
    expect(messages.length).to.equal(1);
    expect(messages[0].from).to.equal(from.address);
    expect(messages[0].content).to.equal(message);
  });
});
