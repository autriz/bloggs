<script lang="ts">
	import { crossfade } from "svelte/transition";
	import { cubicInOut } from "svelte/easing";
	import { page } from "$app/stores";

	export let data;

	const [send, receive] = crossfade({
		duration: 300,
		easing: cubicInOut,
	});

	const links = [
		{
			url: `/users/${data.user.id}`,
			name: "О пользователе",
		},
		{
			url: `/users/${data.user.id}/comments`,
			name: "Комментарии",
		},
		{
			url: `/users/${data.user.id}/posts`,
			name: "Посты",
		},
	];
</script>

<div class="mx-auto mt-4 w-[600px]">
	<div class="flex flex-row gap-3">
		<img src={data.user.avatar} width="80" height="80" class="rounded-md" />
		<div class="my-2">
			<h1 class="text-3xl font-bold">{data.user.username}</h1>
			<p class="text-neutral-400">
				{data.user.firstName ?? ""}
				{data.user.lastName ?? ""}
			</p>
		</div>
	</div>
	<div class="mt-8 flex flex-row gap-2">
		{#each links as link}
			<a
				href={link.url}
				data-sveltekit-noscroll
				class="relative rounded-md px-3 py-2 text-lg"
			>
				{link.name}
				{#if $page.url.pathname === link.url}
					<div
						in:send={{ key: "trigger" }}
						out:receive={{ key: "trigger" }}
						class="absolute bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-primary"
					/>
				{/if}
			</a>
		{/each}
	</div>
	<slot />
</div>
