<script lang="ts">
  import "./app.css";

  import WalletBalance from "./lib/WalletBalance.svelte";
  import NFTImage from "./lib/NFTImage.svelte";

  import { count } from "./stores";
</script>

<main class="w-full flex p-16 gap-16 flex-col items-center">
  <WalletBalance />

  <div class="flex flex-row gap-8 items-center justify-center flex-wrap">
    {#await count.update()}
      <div>Loading NFTs...</div>
    {:then}
      {#each Array.from(Array($count + 1).keys()) as tokenId (tokenId)}
        <div>
          <NFTImage {tokenId} />
        </div>
      {/each}
    {/await}
  </div>
</main>
