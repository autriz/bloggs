<script lang="ts">
	import { page } from "$app/stores";
</script>

<div>
	<h1>Code {$page.status}</h1>
	<p>{$page.error.message}</p>
</div>
