<script lang="ts">
	import { Search } from "lucide-svelte";
	import { ThemeSwitch, UserInteraction } from "$lib/components/nav/index.js";
	import { page } from "$app/stores";
	import Tooltip from "./tooltip.svelte";

	export let data: App.Locals;

	$: isInAuth =
		$page.url.pathname.endsWith("/register") ||
		$page.url.pathname.endsWith("/login");
</script>

{#if !isInAuth}
	<div class="bg-primary sticky bottom-0 z-40 md:bottom-[none] md:top-0">
		<header class="mx-auto w-full max-w-[72rem] px-6">
			<div
				class="text-secondary-foreground mx-auto flex h-14 w-full items-center px-8 md:bg-transparent"
			>
				<div>
					<a
						data-sveltekit-preload-data="off"
						href="/"
						class="flex flex-row items-center gap-1"
					>
						<img src="/pergament.png" class="h-11" alt="logo" />
						<p
							class="text-secondary-foreground xs:inline hidden pb-3 text-center text-3xl"
							style="font-family: 'Paper Cut';"
						>
							Pergament
						</p>
					</a>
				</div>
				<div class="grow" />
				<nav class="flex items-center gap-3">
					<Tooltip text="Поиск">
						<a
							href="/search"
							aria-label="Go to search page"
							class="hover:text-secondary-foreground transition-colors"
						>
							<Search class="h-5 w-5" />
							<span class="sr-only">Перейти к поиску</span>
						</a>
					</Tooltip>
					<ThemeSwitch />
					<UserInteraction user={data.userData} />
				</nav>
			</div>
		</header>
	</div>
{/if}
