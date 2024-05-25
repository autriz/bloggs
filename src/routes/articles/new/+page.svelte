<script lang="ts">
	import { goto } from "$app/navigation";
	import { CartaEditor } from "carta-md";
	import "carta-md/default.css";
	import "carta-md/default-theme.css";
	import { getCarta } from "$lib/utils.js";

	let titleValue = "";
	let editorValue = "";

	let carta = getCarta();

	async function handleSubmit() {
		console.log(titleValue);
		console.log(editorValue);

		const formData = new FormData();

		formData.append("title", titleValue);
		formData.append("content", editorValue);

		fetch("/api/articles/new", {
			method: "POST",
			body: formData
		}).then(async (res) => {
			if (res.redirected) {
				goto(res.url);
			}
		});
	}
</script>

<div class="mx-10 mb-[60px] mt-[100px] h-fit min-h-full w-full">
	<div class="flex h-full w-full max-w-[95ch] flex-col md:flex-row">
		<div class="flex flex-row-reverse items-center justify-end py-[10px]">
			<input
				class="peer flex h-8 w-full max-w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground invalid:ring-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
				name="title"
				bind:value={titleValue}
				on:keyup
			/>
			<label
				for="title"
				class="w-[160px] pb-0 pr-[10px] text-right text-sm text-secondary-foreground"
			>
				Название поста
			</label>
		</div>
	</div>
	<CartaEditor {carta} bind:value={editorValue} mode="split" />
	<div class="mt-2 flex h-full w-full flex-col md:grow">
		<div class="my-2 flex justify-end gap-1">
			<button
				class="rounded-sm border border-border bg-primary px-3 py-1"
				on:click={() => {
					handleSubmit();
				}}
			>
					Создать
			</button>
			<button
				class="rounded-sm border border-border bg-secondary px-3 py-1"
				on:click={() => {
					goto("/");
				}}
			>
				Отмена
			</button>
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
