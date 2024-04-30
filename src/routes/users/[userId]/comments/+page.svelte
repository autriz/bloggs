<script lang="ts">
	import { Comment } from "$lib/components/user/index.js";

	export let data;
</script>

<div class="flex flex-col">
	{#each data.comments as comment}
		<Comment {comment} />
		<hr class="border-0 border-b-[1px] border-neutral-600" />
	{/each}
</div>
