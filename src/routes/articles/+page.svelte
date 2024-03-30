<script lang="ts">
	export let data;
	const posts = [1, 2, 3, 4, 5];
</script>

<div class="mx-auto w-full max-w-[72rem] px-6">
	<h1>Posts</h1>
	<!-- {#each data.posts as post}
		<a href="/posts/{post.slug}">
			<h2>{post.title}</h2>
			<p>{post.date}</p>
		</a>
	{/each} -->
	{#each posts as post}
		<a href="/articles/{post}">
			<h2>Post {post}</h2>
		</a>
	{/each}
</div>
