<script lang="ts">
	import Article from "$lib/components/article.svelte";

	export let data;
</script>

<div class="mx-auto w-full max-w-[72rem] px-6">
	<div class="my-3 flex flex-col gap-3">
		{#each data.posts as post}
			<Article article={post} />
		{/each}
	</div>
</div>
