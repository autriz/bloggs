<script lang="ts">
	import "./styles.css";
	import "./fonts.css";
	import { Header } from "$lib/components/index.js";
	import { ModeWatcher } from "mode-watcher";

	export let data;
</script>

<svelte:head>
	<title>Pergament</title>
</svelte:head>

<ModeWatcher defaultMode="system" />

<div
	class="bg-background text-secondary-foreground min-w-screen h-fit min-h-screen w-screen"
>
	<div
		class="relative flex min-h-screen w-screen flex-col md:flex-col-reverse"
	>
		<div class="flex flex-1">
			<slot />
		</div>
		<Header {data} />
	</div>
</div>
