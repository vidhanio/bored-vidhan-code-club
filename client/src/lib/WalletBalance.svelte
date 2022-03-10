<script lang="ts">
  import { ethers } from "ethers";

  let ether: string;

  const getEther = async () => {
    const [account] = (await window.ethereum.request({
      method: "eth_requestAccounts",
    })) as string[];
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const balance = await provider.getBalance(account);

    ether = ethers.utils.formatEther(balance);
  };
</script>

<div class="w-full flex gap-4 flex-col items-center">
  <p class="font-bold text-2xl">
    {#await getEther()}
      Loading Balance...
    {:then}
      Your Balance: {ether}
    {/await}
  </p>
  <button on:click={async () => await getEther()}>Show My Balance </button>
</div>
