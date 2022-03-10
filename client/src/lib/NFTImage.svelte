<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import type { JsonRpcSigner } from "@ethersproject/providers";
  import type { BoredVidhanCodeClub } from "../../../hardhat/typechain-types";
  import { ethers } from "ethers";

  export let tokenId: number;
  export let contract: BoredVidhanCodeClub;
  export let signer: JsonRpcSigner;
  export let getCount: () => Promise<void>;

  const imageURI = `img/${tokenId}.jpg`;
  const metadataURI = `metadata/${tokenId}.json`;

  let isMinted = false;

  const getMintedStatus = async () => {
    isMinted = await contract.isContentOwned(metadataURI);
  };

  const mintToken = async () => {
    const conn = contract.connect(signer);
    const result = await contract.payToMint(conn.address, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
    getMintedStatus();

    getCount();
  };

  const getURI = async () => {
    alert(await contract.tokenURI(tokenId));
  };

  onMount(async () => {
    await getMintedStatus();
  });
</script>

<div
  class="rounded-md flex items-center flex-col gap-8 bg-slate-200 dark:bg-slate-800 p-8"
>
  <img
    class="w-64 h-64 aspect-square object-cover rounded-md"
    src={isMinted ? imageURI : "img/placeholder.jpg"}
    alt="nft"
  />
  <p class="font-bold">ID #{tokenId}</p>
  {#if !isMinted}
    <button on:click={mintToken}>Mint</button>
  {:else}
    <button on:click={getURI}>Taken! Show URI</button>
  {/if}
</div>
