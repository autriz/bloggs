<script>
	import Tree from "$lib/components/tree.svelte";
	import { createTableOfContents } from "@melt-ui/svelte";

	export let data;

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree },
	} = createTableOfContents({
		selector: "#content",
		exclude: ["h1", "h3", "h4", "h5", "h6"],
		activeType: "all",
		scrollBehaviour: "smooth",
		headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore"),
		scrollOffset: 80
	});
</script>

<div
	class="mx-10 mb-[120px] mt-[200px] grid min-h-full w-full grid-cols-[1fr_auto_1fr]"
>
	<div></div>
	<article id="content" class="prose dark:prose-invert">
		{@html data.content}
	</article>
	<aside
		class="bg-background border-border sticky bottom-0 top-36 ml-10 hidden h-fit max-w-fit overflow-y-auto rounded-lg border p-4 xl:inline"
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
<div>
	<!-- comments -->
	<!-- {#each comments as comment}
		<Comment {comment}/>
	{/each} -->
</div>

<style>
	article {
		/* max-inline-size: 700px; */
		/* margin-inline: auto; */
	}

	/* h1 {
		text-transform: capitalize;
	} */

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}

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
		@apply overflow-scroll md:min-w-fit;
	}

	:global(.prose img) {
		@apply max-h-screen max-w-full;
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
