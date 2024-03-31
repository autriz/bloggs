<script lang="ts">
	import { flyAndScale } from "$lib/utils/transition.js";
	import { createDropdownMenu, melt } from "@melt-ui/svelte";
	import { LogOut, Settings, User } from "lucide-svelte";
	import Link from "./link.svelte";
	import avatarStore from "$lib/stores/avatarStore.js";

	export let user: NonNullable<App.Locals["userData"]>;

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = createDropdownMenu({
		forceVisible: true,
		loop: true,
	});

	const options = [
		{
			text: "Профиль",
			component: User,
			href: `/users/${user?.id}`,
			type: "normal",
			preload: "hover",
		},
		{
			text: "Настройки",
			component: Settings,
			href: `/settings`,
			type: "normal",
			preload: "hover",
		},
		{
			text: "Выход",
			component: LogOut,
			href: `/logout`,
			type: "dangerous",
			preload: "off",
		},
	] as const;
</script>

<button
	aria-label="Open user dropdown"
	data-open={$open ? "" : undefined}
	class="h-fit w-fit px-3"
	use:melt={$trigger}
>
	<!-- svelte-ignore a11y-missing-content -->
	<img
		class="block h-[40px] w-[40px] rounded-md bg-contain bg-no-repeat"
		src={$avatarStore}
		alt="avatar"
	/>
	<span class="sr-only">Открыть окно</span>
</button>
{#if $open}
	<div
		use:melt={$menu}
		class="z-50 flex w-32 flex-col rounded-md bg-secondary px-1 py-1 shadow-sm shadow-neutral-800"
		transition:flyAndScale={{
			duration: 150,
			y: 0,
			start: 0.96,
		}}
	>
		{#each options as { href, component, text, type, preload }}
			<Link {href} {text} {type} {item} {preload}>
				<svelte:component
					this={component}
					slot="icon"
					class="h-5 w-5"
				/>
			</Link>
		{/each}
		<!-- <a
			class="flex items-center gap-2 rounded-md
			px-2 py-1 text-neutral-400 transition-colors
			data-[highlighted]:bg-neutral-800 data-[highlighted]:text-neutral-300
			data-[selected]:!text-white"
			use:melt={$item}
			href="/users/{user.id}"
		>
			<User class="h-5 w-5" />
			<span class="text-sm font-semibold">Профиль</span>
		</a>
		<a
			class="flex items-center gap-2 rounded-md
			px-2 py-1 text-neutral-400 transition-colors
			data-[highlighted]:bg-neutral-800 data-[highlighted]:text-neutral-300
			data-[selected]:!text-white"
			use:melt={$item}
			href="/settings"
		>
			<Settings class="h-5 w-5" />
			<span class="text-sm font-semibold">Настройки</span>
		</a>
		<a
			data-sveltekit-preload-data="off"
			class="flex items-center gap-2 rounded-md
			px-2 py-1 text-neutral-400 transition-colors
			data-[highlighted]:bg-neutral-800 data-[highlighted]:text-red-600
			data-[selected]:!text-white"
			use:melt={$item}
			href="/logout"
		>
			<LogOut class="h-5 w-5" />
			<span class="text-sm font-semibold">Выход</span>
		</a> -->
	</div>
{/if}
