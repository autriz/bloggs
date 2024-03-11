<script lang="ts">
	import { melt } from "@melt-ui/svelte";
	import ThemeIcon from "./theme-icon.svelte";
	import { getThemeCtx, themes } from "./theme-switch.svelte";

	const {
		elements: { option },
	} = getThemeCtx();
</script>

{#each themes as { value, label }}
	<button
		use:melt={$option({ value, label })}
		class="text-secondary-foreground/60 data-[highlighted]:bg-secondary-foreground/10 data-[highlighted]:text-secondary-foreground/80 data-[selected]:!text-secondary-foreground
		flex items-center gap-2 rounded-md
		px-2 py-1 transition-colors"
	>
		<ThemeIcon theme={value} />
		<span class="text-sm font-semibold">{label}</span>
	</button>
{/each}
