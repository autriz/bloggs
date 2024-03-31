<script lang="ts">
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime.js";
	import "dayjs/locale/ru.js";

	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	export let article: {
		id: number;
		title: string;
		author: {
			id: string;
			avatar: string;
			username: string;
		};
		createdAt: number;
	};
</script>

<div
	class="mx-10 flex flex-col gap-3 rounded-md bg-card p-2 transition-colors hover:bg-secondary/80"
>
	<div class="flex flex-row items-center gap-2">
		<a href="/users/{article.author.id}">
			<img
				src={article.author.avatar}
				alt="avatar"
				height="32"
				width="32"
			/>
		</a>
		<a href="/users/{article.author.id}">{article.author.username}</a>
		<time
			class="text-sm text-neutral-500"
			datetime={dayjs(article.createdAt).toISOString()}
			>{dayjs(article.createdAt).fromNow()}</time
		>
	</div>
	<a
		class="w-fit text-2xl transition-colors hover:text-neutral-300"
		href="/articles/{article.id}">{article.title}</a
	>
</div>
