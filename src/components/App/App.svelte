<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { initScene } from './Scene';

  let graphicParent;

  let setNewTargets;

  const fps = writable(null);

  const clickHandler = () => {
    setNewTargets();
  };

  onMount(() => {
    setNewTargets = initScene({ rootEl: graphicParent, fps });
  });
</script>

<div bind:this={graphicParent}>
  {#if $fps}
    <span class="fps">FPS: {$fps}</span>
  {/if}
  <button on:click={clickHandler}>change data</button>
</div>

<style>
  div {
    display: flex;
    position: relative;
    font-family: sans-serif;
    width: 100%;
    height: 100vh;
  }

  button {
    position: absolute;
    right: 0;
  }

  .fps {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 10px;
  }
</style>
