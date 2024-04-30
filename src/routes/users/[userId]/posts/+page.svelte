<script lang="ts">
	import { Article } from "$lib/components/user/index.js";

	export let data;
</script>

<div class="flex flex-col">
	{#each data.posts as post}
		<Article {post} />
		<hr class="border-0 border-b-[1px] border-neutral-600" />
	{/each}
</div>
