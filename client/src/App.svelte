<script lang="ts">
  import "./app.css";

  import { ethers } from "ethers";
  import { onMount } from "svelte";

  import WalletBalance from "./lib/WalletBalance.svelte";
  import NFTImage from "./lib/NFTImage.svelte";

  import type { BoredVidhanCodeClub } from "@vidhanio/web3-playground-hardhat/typechain-types";
  import BVCC from "@vidhanio/web3-playground-hardhat/artifacts/contracts/BoredVidhanCodeClub.sol/BoredVidhanCodeClub.json";

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    contractAddress,
    BVCC.abi,
    signer
  ) as BoredVidhanCodeClub;

  let totalMinted = 0;

  const getCount = async () => {
    totalMinted = (await contract.count()).toNumber();
  };

  onMount(async () => {
    await getCount();
  });
</script>

<main class="w-full flex p-16 gap-16 flex-col items-center">
  <WalletBalance />

  <div class="flex flex-row gap-8 items-center justify-center flex-wrap">
    {#each Array.from(Array(totalMinted + 1).keys()) as tokenId (tokenId)}
      <div>
        <NFTImage {tokenId} {contract} {signer} {getCount} />
      </div>
    {/each}
  </div>
</main>
