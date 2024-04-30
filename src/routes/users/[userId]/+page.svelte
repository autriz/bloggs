<script lang="ts">
	import dayjs from "dayjs";
	import relativeTime from "dayjs/plugin/relativeTime.js";
	import "dayjs/locale/ru.js";

	dayjs.extend(relativeTime);
	dayjs.locale("ru");

	export let data;
</script>

<div>
	<div>
		<h3>О себе</h3>
		<p>
			{data.user.aboutMe ?? ""}
		</p>
	</div>
	<div>
		<h3>Создан</h3>
		<p>
			{dayjs(data.user.createdAt).fromNow()}
		</p>
	</div>
</div>
