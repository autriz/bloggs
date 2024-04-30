<script lang="ts">
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime.js";
	import "dayjs/locale/ru.js";

	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	export let comment: {
		id: number;
		article: {
			id: number;
			title: string;
		};
		createdAt: Date | null;
		content: string;
	};
</script>

<article class="relative px-2 py-3 hover:bg-accent">
	<!-- svelte-ignore a11y-missing-content -->
	<a class="absolute inset-0" href="/articles/{comment.article.id}" />
	<div class="inline-flex gap-2 text-sm">
		<p>
			{comment.article.title}
		</p>
		<p class="text-neutral-400">
			{dayjs(comment.createdAt).fromNow()}
		</p>
	</div>
	<div>
		<p class="pl-3">{comment.content}</p>
	</div>
</article>
