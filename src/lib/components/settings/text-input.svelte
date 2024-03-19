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
		id={name}
		class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring peer flex h-8 w-full max-w-[250px] rounded-md border px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium invalid:ring-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
		{...$$restProps}
	/>
	<label
		use:melt={$root}
		for={name}
		class="peer-focus:text-secondary-foreground text-muted-foreground w-[160px] pb-0 pr-[10px] text-right text-sm"
	>
		{label}
	</label>
</div>
