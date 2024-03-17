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

<div
	class="mx-10 mb-[60px] mt-[100px] grid min-h-full w-full grid-cols-[1fr_auto_1fr]"
>
	<div></div>
	<div class="flex w-[95ch] flex-col">
		<div
			class="bg-card border-border mr-5 flex w-full flex-col items-end justify-center rounded-md border"
		>
			<div>Название:</div>
			<div>Теги:</div>
			<div class="mb-2 flex gap-1">
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
		<div class="mb-2 flex gap-1">
			<!-- <form method="POST" action="/articles/new?/postArticle" use:enhance>
				<button type="submit">Submit</button>
			</form> -->
			<button
				class="bg-secondary border-border rounded-sm border px-3 py-1"
				on:click={() => {
					isEditing = true;
				}}>Edit</button
			>
			<button
				class="bg-secondary border-border rounded-sm border px-3 py-1"
				on:click={() => {
					isEditing = false;
					parseText();
				}}>Preview</button
			>
		</div>
		<div class="bg-card border-border grow rounded-md border">
			{#if isEditing}
				<div class="h-min overflow-scroll" contenteditable>
					{value}
				</div>
				<!-- <textarea class="h-full w-full rounded-md" bind:value /> -->
			{:else}
				<article>
					{@html compiledValue}
				</article>
			{/if}
		</div>
	</div>
	<div></div>
</div>
