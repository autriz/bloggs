<script lang="ts">
	import Article from "$lib/components/article.svelte";

	export let data;
	const posts = [
		{
			id: 1,
			title: "Test 1",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/6ecddcce-1ebe-4d63-acae-d151da49cd49-ouy1ta.jpg",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 2,
			title: "Test 2",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/6ecddcce-1ebe-4d63-acae-d151da49cd49-ouy1ta.jpg",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 3,
			title: "Test 3",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/6ecddcce-1ebe-4d63-acae-d151da49cd49-ouy1ta.jpg",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 4,
			title: "Test 4",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/6ecddcce-1ebe-4d63-acae-d151da49cd49-ouy1ta.jpg",
				username: "test",
			},
			createdAt: Date.now(),
		},
		{
			id: 5,
			title: "Test 5",
			author: {
				id: "n205wf5ietw9ao5",
				avatar: "https://utfs.io/f/6ecddcce-1ebe-4d63-acae-d151da49cd49-ouy1ta.jpg",
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
