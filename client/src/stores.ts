import ABI from "@bored-vidhan-code-club/hardhat/artifacts/contracts/BoredVidhanCodeClub.sol/BoredVidhanCodeClub.json";
import type { BoredVidhanCodeClub } from "@bored-vidhan-code-club/hardhat/typechain";
import { ethers } from "ethers";
import { writable } from "svelte/store";

const CONTRACT_ADDRESS = "0x9183eA580fc45D74f065d3fc1036584bB86bf956";

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
    CONTRACT_ADDRESS,
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
