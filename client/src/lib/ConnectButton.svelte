<script lang="ts">
  import { ethers } from "ethers";

  import { onMount } from "svelte";

  import { web3 } from "../stores";

  let btn: HTMLButtonElement;

  const connect = async () => {
    await web3.updateAccount(
      await window.ethereum.request?.({ method: "eth_requestAccounts" })
    );
    btn.innerText = "Connected";
  };

  onMount(() => {
    btn.textContent = $web3.account === undefined ? "Connect" : "Connected";
  });
</script>

<button bind:this={btn} on:click={connect} />
