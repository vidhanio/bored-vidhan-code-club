import ABI from "@web3-playground/hardhat/artifacts/contracts/BoredVidhanCodeClub.sol/BoredVidhanCodeClub.json";
import type { BoredVidhanCodeClub } from "@web3-playground/hardhat/typechain";
import { ethers } from "ethers";
import { writable } from "svelte/store";

const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const createCount = () => {
  const { subscribe, set } = writable(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    ABI.abi,
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
