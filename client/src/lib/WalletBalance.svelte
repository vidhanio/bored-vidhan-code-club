<script lang="ts">
  import { ethers } from "ethers";
  import { web3 } from "../stores";
  import { onMount } from "svelte";

  let ether: string;

  const getEther = async () => {
    if (!window.ethereum.request) return;

    const [account] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];

    const balance = await $web3.provider.getBalance(account);

    ether = ethers.utils.formatEther(balance);
  };

  onMount(async () => {
    await getEther();
  });
</script>

<div class="w-full flex gap-4 flex-col items-center">
  <p class="font-bold text-2xl">
    {#if ether}
      Your Balance: {ether}
    {:else}
      Loading Balance...
    {/if}
  </p>
  <button on:click={getEther}>Show My Balance </button>
</div>
