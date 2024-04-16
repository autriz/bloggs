<script lang="ts">
	import { goto } from "$app/navigation";
	import { CartaEditor } from "carta-md";
	import "carta-md/default.css";
	import "carta-md/default-theme.css";
	import { getCarta } from "$lib/utils.js";

	let isEditing = true;

	let value = "";
	let compiledValue = "";

	let carta = getCarta();
	let editorValue = "";

	async function parseText() {
		const response = await fetch("/articles/new", { method: "POST" });
		const { text } = await response.json();
		console.log(text);
	}
</script>

<div class="mx-10 mb-[60px] mt-[100px] h-fit min-h-full w-full">
	<CartaEditor {carta} bind:value={editorValue} mode="split" />
	<div class="flex h-full w-full max-w-[95ch] flex-col md:flex-row">
		<div
			class="mr-5 flex w-full flex-col items-end justify-center rounded-md border border-border bg-card md:w-[260px]"
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
					class="w-[50%] rounded-tl-md border-b border-border bg-card px-3 py-1"
					on:click={() => {
						isEditing = true;
					}}>Edit</button
				>
				<button
					class="w-[50%] rounded-tr-md border-b border-border bg-card px-3 py-1"
					on:click={() => {
						isEditing = false;
						parseText();
					}}>Preview</button
				>
			</div>
			<div
				class="grow rounded-b-md border-b border-l border-r border-border bg-card md:w-full"
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
					class="rounded-sm border border-border bg-secondary px-3 py-1"
					on:click={() => {
						// post
					}}>Создать</button
				>
				<button
					class="rounded-sm border border-border bg-secondary px-3 py-1"
					on:click={() => {
						goto("/");
					}}>Отмена</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	:global(html.dark .shiki, html.dark .shiki span) {
		color: var(--shiki-dark) !important;
		background-color: var(--shiki-dark-bg) !important;
		/* Optional, if you also want font styles */
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}

	/* :global(pre.shiki) {
		@apply overflow-scroll;
	} */

	:global(.prose img) {
		@apply inline max-h-screen max-w-full;
	}

	:global(.prose) {
		@apply !max-w-[95ch] text-wrap;
	}

	:global(.prose :is(li, p)) {
		@apply w-full !max-w-[95ch] text-wrap;
	}

	:global(.prose :is(h2, h3, h4, h5, h6)) {
		@apply mb-3 mt-8;
	}

	:global(.prose p:not(:is(h2, h3, h4, h5, h6) + p)) {
		@apply mt-7;
	}

	textarea::-webkit-scrollbar {
		display: initial;
	}

	textarea {
		-ms-overflow-style: initial;
		scrollbar-width: initial;
	}
</style>
