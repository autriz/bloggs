<script lang="ts">
	import { createTabs, melt } from "@melt-ui/svelte";

	export let value: string = "";

	const {
		elements: { root, list, content, trigger },
	} = createTabs({
		defaultValue: "edit",
	});

	const triggers = [
		{ id: "edit", title: "Edit" },
		{ id: "preview", title: "Preview" },
	];
</script>

<div use:melt={$root} class="h-fit w-full bg-secondary">
	<div use:melt={$list}>
		{#each triggers as triggerItem}
			<button use:melt={$trigger(triggerItem.id)}
				>{triggerItem.title}</button
			>
		{/each}
	</div>
	<div use:melt={$content("edit")}>Edit</div>
	<div use:melt={$content("preview")}>Preview</div>
</div>
