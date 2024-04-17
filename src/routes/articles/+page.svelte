<script lang="ts">
	import Article from "$lib/components/article.svelte";

	export let data;
	console.log(data.posts);
	const posts = [
		{
			id: 1,
			title: "Студвесна ПГУТИ",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "autriz",
			},
			createdAt: Date.now(),
		},
		{
			id: 2,
			title: 'Олимпиада "Цифровая весна"',
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "autriz",
			},
			createdAt: Date.now(),
		},
	];
</script>

<div class="mx-auto w-full max-w-[72rem] px-6">
	<div class="my-3 flex flex-col gap-3">
		{#each data.posts as post}
			<Article article={post} />
		{/each}
	</div>
</div>
