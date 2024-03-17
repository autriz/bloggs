<script lang="ts">
	import { Copy, Check } from "lucide-svelte";
	import { fly } from "svelte/transition";

	let copied = false;
	let copyTimeout: ReturnType<typeof setTimeout>;
	function copyCode() {
		navigator.clipboard.writeText(elem.innerText);
		copied = true;
		clearTimeout(copyTimeout);
		copyTimeout = setTimeout(() => {
			copied = false;
		}, 2500);
	}

	let elem: HTMLElement;
</script>

<div bind:this={elem} class="relative">
	<slot />
	<!-- Copy button -->
	<button
		title="Copy"
		on:click={copyCode}
		class="
      absolute right-4 top-[min(50%_,_32px)] -translate-y-1/2 transform
      rounded p-2 hover:bg-neutral-800 hover:text-neutral-300 active:text-sky-300
    "
	>
		{#if copied}
			<div in:fly={{ y: -4 }}>
				<Check class="h-5 w-5" />
			</div>
		{:else}
			<div in:fly={{ y: 4 }}>
				<Copy class="h-5 w-5" />
			</div>
		{/if}
	</button>
</div>
