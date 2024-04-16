<script lang="ts">
	import Article from "$lib/components/article.svelte";

	export let data;
	const posts = [
		{
			id: 1,
			title: "Test 1",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 2,
			title: "Test 2",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 3,
			title: "Test 3",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 4,
			title: "Test 4",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 5,
			title: "Test 5",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/ce294921-030b-4ca8-b520-16aa90dfd811-asmh7d.png",
				username: "test",
			},
			createdAt: Date.now(),
		},
	];
</script>

<div class="mx-auto w-full max-w-[72rem] px-6">
	<div class="my-3 flex flex-col gap-3">
		{#each posts as post}
			<Article article={post} />
		{/each}
	</div>
</div>
