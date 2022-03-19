<script lang="ts">
  import { ethers } from "ethers";
  import { web3 } from "../stores";

  let balanceText: string | null | undefined = undefined;

  const updateBalance = async () => {
    if ($web3.account !== undefined) {
      balanceText = undefined;
      const balance = await $web3.provider.getBalance($web3.account);
      balanceText = ethers.utils.formatEther(balance);
    } else {
      balanceText = null;
    }
  };

  $: $web3.account, updateBalance();
</script>

<div class="w-full flex gap-4 flex-col items-center">
  <p class="font-bold text-2xl">
    {#if balanceText}
      Your Balance: {balanceText}
    {:else if balanceText === null}
      No account selected
    {:else if balanceText === undefined}
      Loading...
    {/if}
  </p>
  <button on:click={updateBalance}>Show My Balance </button>
</div>
