<script lang="ts">
	export let data;
</script>

<h1>User list</h1>
{#each data.users as user}
	<p>{user.id}</p>
{/each}
