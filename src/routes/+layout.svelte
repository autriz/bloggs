<script lang="ts">
	import "./styles.css";
	import "./fonts.css";
	import { Header } from "$lib/components/index.js";
	import avatarStore from "$lib/stores/avatarStore.js";
	import { ModeWatcher } from "mode-watcher";

	export let data;

	avatarStore.set(data.userData?.avatar || "");
</script>

<svelte:head>
	<title>Pergament</title>
</svelte:head>

<ModeWatcher defaultMode="system" />

<div
	class="min-w-screen h-fit min-h-[100dvh] max-w-full bg-background text-secondary-foreground"
>
	<div class="relative flex min-h-screen flex-col md:flex-col-reverse">
		<div class="flex flex-1">
			<slot />
		</div>
		<Header {data} />
	</div>
</div>
