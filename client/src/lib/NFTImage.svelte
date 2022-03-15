<script lang="ts">
  import { ethers } from "ethers";
  import { count } from "../stores";
  import type { Metadata } from "src/types";

  export let tokenId: number;

  let isMinted = false;

  let metadata: Metadata;

  const getMetadata = async () => {
    isMinted = tokenId < (await count.contract.count()).toNumber();
    if (isMinted) {
      const tokenURI = await count.contract.tokenURI(tokenId);
      const json = await fetch(tokenURI);
      metadata = await json.json();
    }
  };

  const mintToken = async () => {
    count.contract.connect(count.signer);
    const result = await count.contract.mint({
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
    isMinted = tokenId < (await count.contract.count()).toNumber();

    await count.update();
    await getMetadata();
  };

  const showInfo = () => {
    let text = "";
    metadata.attributes.forEach((attr) => {
      text += `${attr.trait_type}: ${attr.value}\n`;
    });

    alert(text);
  };
</script>

<div
  class="rounded-md flex items-center flex-col gap-8 bg-slate-200 dark:bg-slate-800 p-8"
>
  {#await getMetadata()}
    <img
      class="w-64 h-64 aspect-square object-cover rounded-md"
      src={"/img/placeholder.png"}
      alt="nft"
    />
  {:then}
    <img
      class="w-64 h-64 aspect-square object-cover rounded-md"
      src={metadata ? metadata.image : "/img/placeholder.png"}
      alt="nft"
    />
  {/await}

  <p class="font-bold">ID #{tokenId}</p>

  {#if !isMinted}
    <button on:click={mintToken}>Mint</button>
  {:else}
    <button on:click={showInfo}>Taken! Show Info</button>
  {/if}
</div>
