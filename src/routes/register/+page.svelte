<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<h1>Register</h1>

	<label for="email">Email</label>
	<input type="email" name="email" />

	<label for="username">Username</label>
	<input type="text" name="username" />

	<label for="password">Password</label>
	<input type="password" name="password" />

	<button type="submit">Register</button>
</form>
<p>Already have an account? <a href="/login">Login</a></p>
