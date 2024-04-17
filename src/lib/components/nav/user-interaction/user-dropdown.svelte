<script lang="ts">
	import { flyAndScale } from "$lib/utils/transition.js";
	import { createDropdownMenu, melt } from "@melt-ui/svelte";
	import { LogOut, Settings, User } from "lucide-svelte";
	import Link from "./link.svelte";
	import avatarStore from "$lib/stores/userStore.js";

	export let user: NonNullable<App.Locals["userData"]>;

	const {
		elements: { trigger, menu, item, overlay },
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
	class="mx-3 h-fit w-fit"
	use:melt={$trigger}
>
	<!-- svelte-ignore a11y-missing-content -->
	<img
		class="block h-[40px] w-[40px] rounded-md bg-contain bg-no-repeat"
		src={$avatarStore?.avatar}
		alt="avatar"
	/>
	<span class="sr-only">Открыть окно</span>
</button>
{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-40" />
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
	</div>
{/if}
