<script lang="ts">
	export let data;
</script>

<h1>Posts</h1>
{#each data.posts as post}
	<a href="/posts/{post.slug}">
		<h2>{post.title}</h2>
		<p>{post.date}</p>
	</a>
{/each}
