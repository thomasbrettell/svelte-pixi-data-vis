<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { initScene } from './Scene';

  let graphicParent;

  const fps = writable(null);

  onMount(() => {
    initScene({ rootEl: graphicParent, fps });
  });
</script>

<div bind:this={graphicParent}>
  {#if $fps}
    <span class="fps">FPS: {$fps}</span>
  {/if}
</div>

<style>
  div {
    display: flex;
    position: relative;
    font-family: sans-serif;
    width: 100%;
    height: 100vh;
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
