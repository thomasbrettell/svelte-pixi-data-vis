<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { initScene } from './Scene';
  import Scroller from '../Scrolly.svelte';
  import Panel from '../Panel.svelte';
  import { DATA_AMOUNT } from '../../constants';

  let index = null;
  let prevIndex = null;

  let graphicParent;

  let setNewTargets;

  $: if (index != prevIndex) {
    if (setNewTargets) {
      setNewTargets();
    }
    prevIndex = index;
  }

  const fps = writable(null);

  onMount(() => {
    setNewTargets = initScene({ rootEl: graphicParent, fps });
    prevIndex = index;
  });
</script>

<Scroller bind:index query=".panel">
  <div slot="background">
    <div class="graphic-container" bind:this={graphicParent}>
      {#if $fps}
        <span class="fps"
          >FPS: {$fps}<br />
          Data amount: {DATA_AMOUNT}
        </span>
      {/if}
    </div>
  </div>
  <div slot="foreground">
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
    <Panel>1</Panel>
  </div>
</Scroller>

<style>
  .graphic-container {
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

  :global(svelte-scroller-foreground) {
    user-select: none;
    pointer-events: none;
  }
</style>
