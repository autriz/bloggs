<script lang="ts" context="module">
	import { getContext, setContext } from "svelte";
	import type { Theme } from "./types.js";

	export const getThemeCtx = () => {
		return getContext<Select<Theme>>("theme");
	};

	export const setThemeCtx = (ctx: Select<Theme>) => {
		setContext("theme", ctx);
	};

	export const themes: SelectOption<Theme>[] = [
		{ value: "dark", label: "Темный" },
		{ value: "light", label: "Светлый" },
		{ value: "system", label: "Система" },
	];
</script>

<script lang="ts">
	import Tooltip from "$lib/components/tooltip.svelte";
	import { flyAndScale } from "$lib/utils/index.js";
	import {
		type Select,
		createSelect,
		melt,
		type SelectOption,
	} from "@melt-ui/svelte";
	import { mode, userPrefersMode } from "mode-watcher";
	import Options from "./options.svelte";
	import ThemeIcon from "./theme-icon.svelte";

	function modeToOption(mode: Theme): SelectOption<Theme> {
		return themes.find(({ value }) => value === mode) ?? themes[0];
	}

	function optionToMode(option: SelectOption<Theme>): Theme {
		return option.value;
	}

	const select = createSelect({
		positioning: { placement: "bottom", gutter: 10 },
		forceVisible: true,
		defaultSelected: modeToOption($userPrefersMode),
		loop: false,
		onSelectedChange: ({ curr, next }) => {
			const definedNext = next ?? curr ?? themes[0];
			$userPrefersMode = optionToMode(definedNext);
			return definedNext;
		},
	});

	setThemeCtx(select);

	const {
		elements: { trigger, menu, arrow },
		states: { open },
	} = select;
</script>

<Tooltip text="Сменить тему">
	<button
		class="hover:text-secondary-foreground transition-colors"
		aria-label="Open theme switcher"
		data-open={$open ? "" : undefined}
		use:melt={$trigger}
	>
		<ThemeIcon theme={$mode} />
		<span class="sr-only">Открыть окно</span>
	</button>
</Tooltip>

{#if $open}
	<div
		use:melt={$menu}
		class="bg-secondary z-50 flex w-32 flex-col rounded-md px-1 py-1 shadow-sm shadow-neutral-800"
		transition:flyAndScale={{
			duration: 150,
			y: 0,
			start: 0.96,
		}}
	>
		<div use:melt={$arrow} />
		<Options />
	</div>
{/if}
