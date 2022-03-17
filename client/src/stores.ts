import ABI from "@web3-playground/hardhat/artifacts/contracts/BoredVidhanCodeClub.sol/BoredVidhanCodeClub.json";
import type { BoredVidhanCodeClub } from "@web3-playground/hardhat/typechain";
import { ethers } from "ethers";
import { writable } from "svelte/store";

const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

type Web3 = {
  contract: BoredVidhanCodeClub;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
  count: number;
};

const createWeb3 = () => {
  const { subscribe, set, update } = writable<Web3>();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    ABI.abi,
    signer
  ) as BoredVidhanCodeClub;

  const updateCount = async (): Promise<void> => {
    const count = await contract.count();

    update((contract) => ({
      ...contract,
      count: count.toNumber(),
    }));
  };

  set({
    contract,
    provider,
    signer,
    count: 0,
  });

  return {
    subscribe,
    updateCount,
  };
};

export const web3 = createWeb3();
