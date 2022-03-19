<script lang="ts">
  import { ethers } from "ethers";
  import { web3 } from "../stores";
  import type { Metadata } from "src/types";
  import { onMount } from "svelte";

  export let tokenId: number;

  let minted = false;
  let metadata: Metadata | undefined = undefined;

  let loading = false;

  const loaded = (fn: () => Promise<void>): (() => Promise<void>) => {
    return async () => {
      loading = true;
      try {
        await fn();
      } finally {
        loading = false;
      }
    };
  };

  const updateMinted = () => {
    minted = tokenId < $web3.count;
  };

  const updateMetadata = loaded(async () => {
    if (minted) {
      const tokenURI = (await $web3.contract.tokenURI(tokenId)).replace(
        "ipfs://",
        "http://127.0.0.1:8080/ipfs/"
      );
      const json = await fetch(tokenURI);
      metadata = await json.json();
    }
  });

  const mintToken = loaded(async () => {
    $web3.contract.connect($web3.signer);
    const transaction = await $web3.contract.mint({
      value: ethers.utils.parseEther("0.05"),
    });

    await transaction.wait();
    loading = false;

    await web3.updateCount();

    updateMinted();
    await updateMetadata();
  });

  const showInfo = () => {
    if (!metadata) return;

    let text = "";

    metadata.attributes.forEach((attr) => {
      text += `${attr.trait_type}: ${attr.value}\n`;
    });

    alert(text);
  };

  onMount(async () => {
    updateMinted();
    await updateMetadata();
  });
</script>

<div
  class="rounded-md flex items-center flex-col gap-8 bg-slate-200 dark:bg-slate-800 p-8"
>
  {#if metadata && minted}
    <img
      class="w-64 h-64 aspect-square object-cover rounded-md"
      src={metadata.image.replace("ipfs://", "http://127.0.0.1:8080/ipfs/")}
      alt="nft"
    />
  {:else if loading || (!metadata && minted)}
    <img
      class="w-64 h-64 aspect-square object-cover rounded-md"
      src={"loading.gif"}
      alt="nft"
    />
  {:else if !minted && !loading}
    <img
      class="w-64 h-64 aspect-square object-cover rounded-md"
      src="unminted.png"
      alt="nft"
    />
  {/if}

  <p class="font-bold text-center max-w-fit">
    {#if metadata && minted}
      {metadata.name}
    {:else if !minted}
      Unminted
    {:else if !metadata}
      Loading...
    {/if}
  </p>

  <p class="font-bold">ID #{tokenId}</p>

  {#if !minted}
    <button on:click={mintToken}>Mint</button>
  {:else}
    <button on:click={showInfo}>Taken! Show Info</button>
  {/if}
</div>
