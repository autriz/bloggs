<script lang="ts">
	// import "@cartamd/plugin-code/default.css";
	// import "@cartamd/plugin-anchor/default.css";
	import Tree from "$lib/components/tree.svelte";
	import { createTableOfContents } from "@melt-ui/svelte";
	import { CartaViewer, CartaEditor } from "carta-md";
	import { getCarta } from "$lib/utils.js";
	import { compile } from "mdsvex";
	import Editor from "$lib/components/editor.svelte";
	import avatarStore from "$lib/stores/avatarStore.js";
	import type { ActionData, PageData } from "./$types.js";
	import { enhance } from "$app/forms";
	import clsx from "clsx";

	export let data: PageData;
	export let form: ActionData;

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree },
	} = createTableOfContents({
		selector: "#content",
		exclude: ["h1", "h4", "h5", "h6"],
		activeType: "all",
		scrollBehaviour: "smooth",
		headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore"),
		scrollOffset: 80,
	});

	let content = data.content?.code ?? "";

	const comments: string[] = ["test", "test2", "test3"];
</script>

<div class="mx-10 mb-[60px] mt-[40px] h-full min-h-full w-full">
	<div class="grid min-h-full w-full grid-cols-[1fr_auto_1fr]">
		<div></div>
		<article id="content" class="prose dark:prose-invert">
			{@html content}
			<!-- <CartaViewer {carta} value={data.content} /> -->
		</article>
		<aside
			class="sticky bottom-0 top-36 ml-10 hidden h-fit w-fit max-w-[260px] overflow-y-auto rounded-lg border border-border bg-background p-4 xl:inline"
		>
			<p class="font-semibold text-secondary-foreground">На странице</p>
			<nav>
				{#key $headingsTree}
					<Tree
						tree={$headingsTree}
						activeHeadingIdxs={$activeHeadingIdxs}
						{item}
					/>
				{/key}
			</nav>
		</aside>
	</div>
	<div class="mx-auto mt-6 h-fit w-full max-w-[95ch]">
		<h2 class="text-xl font-semibold">Comments</h2>
		<form
			method="POST"
			action="?/newComment"
			use:enhance
			class="my-6 flex flex-col space-y-4"
		>
			<div class="flex flex-col space-y-2">
				<textarea
					role="textbox"
					name="content"
					value={form?.data?.content ?? ""}
					placeholder="Add new comment"
					aria-invalid={!!form?.errors?.text}
					class={clsx(
						"box-content min-h-[100px] resize-y overflow-y-auto rounded-md border-2 border-border bg-background p-2 shadow-sm outline-none focus:border-primary",
					)}
				/>
				{#if !form?.success && form?.errors}
					<span class="text-sm text-red-500"
						>Something went wrong</span
					>
				{/if}
			</div>
			<button
				type="submit"
				class="text-md w-32 rounded-md bg-primary/80 px-3 py-2 hover:bg-primary"
			>
				Comment
			</button>
		</form>
		<!-- comments -->
		<section class="flex flex-col gap-4">
			{#if comments.length > 0}
				{#each comments as comment}
					<!-- <Comment {comment} /> -->
					<div>
						<div class="grid grid-cols-[48px_1fr] items-center">
							<div>
								<a
									><img
										src={$avatarStore}
										class="rounded-md"
										alt="avatar"
										height="48"
										width="48"
									/></a
								>
							</div>
							<div class="ml-2">
								<a class="font-semibold">username</a>
								<time class="text-neutral-500">8h ago</time>
							</div>
						</div>
						<div class="grid grid-cols-[48px_1fr]">
							<div></div>
							<span class="ml-3">{comment}</span>
						</div>
					</div>
				{/each}
			{:else}
				<p class="text-center">
					Comment section is empty. Be the one to start a
					conversation!
				</p>
			{/if}
		</section>
	</div>
</div>

<style>
	:global(#content h1) {
		@apply border-b border-border pb-1 !text-2xl;
	}

	:global(#content h2) {
		@apply !text-xl;
	}

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
