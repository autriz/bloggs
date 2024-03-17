<script lang="ts">
	import { clsx } from "clsx";
	import { createDropdownMenu, melt } from "@melt-ui/svelte";

	export let href: string;
	export let type: "normal" | "dangerous";
	export let text: string;
	export let item: ReturnType<typeof createDropdownMenu>["elements"]["item"];
	export let preload: "off" | "hover" | "tap";
</script>

<a
	class={clsx(
		type === "normal"
			? "data-[highlighted]:text-secondary-foreground/80"
			: "data-[highlighted]:text-red-600",
		"data-[highlighted]:bg-secondary-foreground/10 text-secondary-foreground/60 flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
	)}
	{href}
	use:melt={$item}
	data-sveltekit-preload-data={preload}
>
	<slot name="icon" />
	<span class="text-sm font-semibold">{text}</span>
</a>
