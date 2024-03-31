<script lang="ts">
	import { enhance } from "$app/forms";

	export let title: string;
</script>

<form
	{...$$restProps}
	class="flex flex-col-reverse bg-card md:flex-row-reverse"
	on:submit
>
	<div class="peer flex flex-1 flex-col gap-[1px]">
		<slot />
	</div>
	<div
		class="p-[20px] pl-[50px] transition-colors peer-focus-within:bg-primary md:w-[250px]"
	>
		{title}
	</div>
</form>
