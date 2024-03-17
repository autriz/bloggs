<script lang="ts">
	export let title: string;
</script>

<form {...$$restProps} class="flex flex-col-reverse md:flex-row-reverse">
	<div class="bg-card peer flex flex-1 flex-col gap-2 p-[10px]">
		<slot />
	</div>
	<div
		class="bg-secondary peer-focus-within:bg-primary p-[20px] pl-[50px] transition-colors md:w-[250px]"
	>
		{title}
	</div>
</form>
