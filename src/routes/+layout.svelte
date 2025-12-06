<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style>
  :global(body) {
    font-family: 'Philosopher', sans-serif;
    --primary-color: rgb(57, 59, 77);
  }
</style>
