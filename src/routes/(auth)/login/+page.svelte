<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<h1>Log in</h1>

<form method="post" use:enhance action="?/logIn">
	<label class="label mb-4" for="email">
		<span>Email</span>
		<input class="input" name="email" id="email" />
	</label>
	<label class="label mb-4" for="password">
		<span>Password</span>
		<input class="input" type="password" name="password" id="password" />
	</label>
	<button class="btn variant-filled" type="submit">Log in</button>
</form>

<p>Don't have an account? <a href="/register">Register</a>.</p>
