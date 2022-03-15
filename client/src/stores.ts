import BVCC from "@vidhanio/web3-playground-hardhat/artifacts/contracts/BoredVidhanCodeClub.sol/BoredVidhanCodeClub.json";
import type { BoredVidhanCodeClub } from "@vidhanio/web3-playground-hardhat/typechain-types";
import { ethers } from "ethers";
import { writable } from "svelte/store";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const createCount = () => {
  const { subscribe, set } = writable(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    BVCC.abi,
    signer
  ) as BoredVidhanCodeClub;

  const update = async (): Promise<void> => {
    set((await contract.count()).toNumber());
  };

  return {
    subscribe,
    provider,
    signer,
    contract,
    update,
  };
};

export const count = createCount();
