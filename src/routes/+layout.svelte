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
    font-size: 24px;
    --primary-color: rgb(57, 59, 77);
    --secondary-color: rgb(100, 102, 119);
  }
  :global(input, textarea, select) {
    font-family: 'Philosopher', sans-serif;
    font-size: 16px;
  }
  :global(button) {
    font-family: 'Philosopher', sans-serif;
    font-size: 16px;
    cursor: pointer;
  }

</style>
