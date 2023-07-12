<script  context="module">var ScrollPositions;
(function (ScrollPositions) {
    ScrollPositions["FULL"] = "FULL";
    ScrollPositions["ABOVE"] = "ABOVE";
    ScrollPositions["BELOW"] = "BELOW";
})(ScrollPositions || (ScrollPositions = {}));
</script>

<script >import Panel from './Panel.svelte';
import { onMount } from 'svelte';
export let customPanel = null;
export let panels;
export let onProgress = null;
export let onMarker;
export let observerOptions = {
    threshold: 0.5
};
const isOdyssey = window.__IS_ODYSSEY_FORMAT__;
let scrollytellerRef;
let steps = [];
let marker;
let scrollingPos;
const getScrollingPos = () => {
    const boundingRect = scrollytellerRef.getBoundingClientRect();
    if (boundingRect.bottom - window.innerHeight < 0) {
        return ScrollPositions.BELOW;
    }
    if (boundingRect.top > 0) {
        return ScrollPositions.ABOVE;
    }
    return ScrollPositions.FULL;
};
const IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            marker = entry.target.scrollyData;
        }
    });
};
const observer = new IntersectionObserver(IntersectionObserverCallback, observerOptions);
onMount(() => {
    scrollingPos = getScrollingPos();
    if (scrollingPos === ScrollPositions.ABOVE)
        marker = panels[0].data;
    if (scrollingPos === ScrollPositions.BELOW)
        marker = panels[panels.length - 1].data;
    steps.forEach((step, i) => {
        observer.observe(step);
    });
    setvhAmount();
});
const setvhAmount = () => {
    const height = window.innerHeight;
    scrollytellerRef.style.setProperty('--vh', `${height / 100}px`);
};
const windowResizeHandler = () => {
    setvhAmount();
};
const scrollHandler = () => {
    const rootRect = scrollytellerRef.getBoundingClientRect();
    onProgress({
        boundingRect: rootRect,
        rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
        scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
    });
};
$: marker && onMarker(marker);
</script>

<svelte:window on:resize={windowResizeHandler} on:scroll={onProgress ? scrollHandler : null} />

<svelte:head>
	{#if isOdyssey}
		<!-- styles required to make position sticky work -->
		<!-- existing styles on an Odyssey body are preventing position sticky from 'sticking' -->
		<style>
			body {
				overflow: visible;
			}
		</style>
	{/if}
</svelte:head>

<div class="scrollyteller" bind:this={scrollytellerRef}>
	<div class="graphic">
		<slot />
	</div>
	<div class="content">
		{#each panels as panel}
			{#if customPanel}
				<svelte:component this={customPanel} {...panel} {steps} />
			{:else}
				<Panel props={{ ...panel, steps }} />
			{/if}
		{/each}
	</div>
</div>


<style >/* Variables and mixins declared here will be available in all other SCSS files */
.scrollyteller {
  position: relative;
}

.graphic {
  transform: translate3d(0, 0, 0);
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}

.content {
  margin-top: calc(var(--vh, 1vh) * -100);
  position: relative;
  z-index: 2;
  overflow: hidden;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
}</style>
