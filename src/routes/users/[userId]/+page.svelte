<script lang="ts">
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime.js";
	import "dayjs/locale/ru.js";

	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	export let data;
</script>

<div class="mt-4 flex flex-col gap-3 cursor-default">
	<div class="">
		<h3 class="text-primary-foreground/80 text-2xl border-b border-primary w-fit select-none">О себе</h3>
		{#if data.user.aboutMe}
			<p class="mt-3 ml-3">{data.user.aboutMe}</p>
		{:else}
			<p class="mt-3 ml-3 text-primary-foreground/80">Пустота...</p>
		{/if}
	</div>
	<div>
		<h3 class="text-primary-foreground/80 text-2xl border-b border-primary w-fit select-none">Аккаунт создан</h3>
		<p class="mt-3 ml-3">
			{dayjs(data.user.createdAt).fromNow()}
		</p>
	</div>
</div>
