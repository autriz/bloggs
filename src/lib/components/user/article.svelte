<script lang="ts">
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime.js";
	import "dayjs/locale/ru.js";

	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	export let post: {
		id: number;
		title: string;
		titleImage: string | null;
		createdAt: Date | null;
	};
</script>

<article class="relative px-2 py-3 hover:bg-accent">
	<!-- svelte-ignore a11y-missing-content -->
	<a class="absolute inset-0" href="/articles/{post.id}" />
	<div>
		<p>
			{post.title}
		</p>
		<p class="text-sm text-neutral-400">
			{dayjs(post.createdAt).fromNow()}
		</p>
	</div>
</article>
