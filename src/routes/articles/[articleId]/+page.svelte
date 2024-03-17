<script lang="ts">
	import "@cartamd/plugin-code/default.css";
	import "@cartamd/plugin-anchor/default.css";
	import Tree from "$lib/components/tree.svelte";
	import { createTableOfContents } from "@melt-ui/svelte";
	import { CartaViewer, CartaEditor } from "carta-md";
	import { getCarta } from "$lib/utils.js";
	import { compile } from "mdsvex";

	export let data;

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
</script>

<div class="mx-10 mb-[60px] mt-[100px] h-full min-h-full w-full">
	<div class="grid min-h-full w-full grid-cols-[1fr_auto_1fr]">
		<div></div>
		<article id="content" class="prose dark:prose-invert">
			{@html content}
			<!-- <CartaViewer {carta} value={data.content} /> -->
		</article>
		<aside
			class="bg-background border-border sticky bottom-0 top-36 ml-10 hidden h-fit w-fit max-w-[260px] overflow-y-auto rounded-lg border p-4 xl:inline"
		>
			<p class="text-secondary-foreground font-semibold">На странице</p>
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
	<div class="mx-auto mt-6 h-fit w-[95ch]">
		<h2 class="text-xl font-semibold">Comments</h2>
		<textarea />
		<!-- comments -->
		<!-- {#each comments as comment}
			<Comment {comment}/>
		{/each} -->
	</div>
</div>

<style>
	:global(#content h1) {
		@apply border-border border-b pb-1 !text-2xl;
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

	:global(pre.shiki) {
		@apply overflow-scroll;
	}

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
</style>
