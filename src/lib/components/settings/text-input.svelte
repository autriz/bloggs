<script lang="ts">
	import { createLabel, melt } from "@melt-ui/svelte";

	export let name: string;
	export let label: string;

	const {
		elements: { root },
	} = createLabel();
</script>

<div class="flex flex-row-reverse items-center justify-end py-[10px]">
	<input
		{name}
		class="peer flex h-8 w-full max-w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground invalid:ring-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
		{...$$restProps}
		on:keyup
		on:change
		on:keydown
	/>
	<label
		use:melt={$root}
		for={name}
		class="w-[160px] pb-0 pr-[10px] text-right text-sm text-muted-foreground peer-focus:text-secondary-foreground"
	>
		{label}
	</label>
</div>
