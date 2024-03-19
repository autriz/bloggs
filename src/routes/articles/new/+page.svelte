<script lang="ts">
	import { goto } from "$app/navigation";

	let isEditing = true;

	let value = "";
	let compiledValue = "";

	async function parseText() {
		const response = await fetch("/articles/new", { method: "POST" });
		const { text } = await response.json();
		console.log(text);
	}
</script>

<div class="mx-10 mb-[60px] mt-[100px] min-h-full w-full">
	<div class="flex h-full w-full max-w-[95ch] flex-col md:flex-row">
		<div
			class="bg-card border-border mr-5 flex w-full flex-col items-end justify-center rounded-md border md:w-[260px]"
		>
			<div>Название:</div>
			<div>Теги:</div>
		</div>
		<div class="mt-2 flex h-full w-full flex-col md:grow">
			<div class="flex w-full">
				<!-- <form method="POST" action="/articles/new?/postArticle" use:enhance>
					<button type="submit">Submit</button>
				</form> -->
				<button
					class="bg-card border-border w-[50%] rounded-tl-md border-b px-3 py-1"
					on:click={() => {
						isEditing = true;
					}}>Edit</button
				>
				<button
					class="bg-card border-border w-[50%] rounded-tr-md border-b px-3 py-1"
					on:click={() => {
						isEditing = false;
						parseText();
					}}>Preview</button
				>
			</div>
			<div
				class="bg-card border-border grow rounded-b-md border-b border-l border-r md:w-full"
			>
				{#if isEditing}
					<div class="h-full overflow-scroll">
						{value}
					</div>
					<!-- <textarea class="h-full w-full rounded-md" bind:value /> -->
				{:else}
					<article>
						{@html compiledValue}
					</article>
				{/if}
			</div>
			<div class="my-2 flex justify-end gap-1">
				<button
					class="bg-secondary border-border rounded-sm border px-3 py-1"
					on:click={() => {
						// post
					}}>Создать</button
				>
				<button
					class="bg-secondary border-border rounded-sm border px-3 py-1"
					on:click={() => {
						goto("/");
					}}>Отмена</button
				>
			</div>
		</div>
	</div>
</div>
