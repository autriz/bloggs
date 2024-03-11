<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<h1>Register</h1>
<form method="post" use:enhance action="?/register">
	<label class="label mb-4" for="email">
		<span>Email</span>
		<input class="input" type="email" name="email" id="email" />
	</label>
	<label class="label mb-4" for="username">
		<span>Username</span>
		<input class="input" name="username" id="username" />
	</label>
	<label class="label mb-4" for="password">
		<span>Password</span>
		<input class="input" type="password" name="password" id="password" />
	</label>
	<button class="btn variant-filled" type="submit">Register</button>
</form>

<p>Already have an account? <a href="/login">Log in</a>.</p>
