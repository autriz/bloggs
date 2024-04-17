<script lang="ts">
	import { Tooltip } from "$lib/components/index.js";
	import { PencilLine } from "lucide-svelte";
	import UserDropdown from "./user-dropdown.svelte";

	export let user: App.Locals["userData"];
</script>

{#if user}
	<Tooltip text="Написать пост">
		<a
			href="/articles/new"
			class="transition-colors hover:text-secondary-foreground"
		>
			<PencilLine class="h-5 w-5" />
			<span class="sr-only">Написать пост</span>
		</a>
	</Tooltip>
	<UserDropdown {user} />
{:else}
	<a href="/login">Войти</a>
{/if}
