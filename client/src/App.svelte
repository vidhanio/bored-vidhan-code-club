<script lang="ts">
  import "./app.css";

  import WalletBalance from "./lib/WalletBalance.svelte";
  import NFTImage from "./lib/NFTImage.svelte";

  import { web3 } from "./stores";
  import ConnectButton from "./lib/ConnectButton.svelte";
  import { onDestroy, onMount } from "svelte";

  onMount(() => {
    window.ethereum &&
      window.ethereum.on("accountsChanged", web3.updateAccount);
  });

  onDestroy(() => {
    window.ethereum &&
      window.ethereum.removeListener("accountsChanged", web3.updateAccount);
  });
</script>

<main class="w-full flex p-16 gap-16 flex-col items-center">
  {#if window.ethereum}
    <ConnectButton />
    <div class="flex flex-row gap-8 items-center justify-center flex-wrap">
      {#if $web3.account !== undefined}
        <WalletBalance />
        {#await web3.updateCount()}
          <div>Loading NFTs...</div>
        {:then}
          {#each Array.from(Array($web3.count + 1).keys()) as tokenId (tokenId)}
            <div>
              <NFTImage {tokenId} />
            </div>
          {/each}
        {/await}
      {/if}
    </div>
  {:else}
    <a href="https://metamask.io/">Install MetaMask</a>
  {/if}
</main>
