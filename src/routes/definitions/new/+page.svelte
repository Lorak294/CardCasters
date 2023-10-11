<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="container">
	<div class="widget">
		<form method="post" action="?/create_definition" class="definition-form" use:enhance>
			<h1 class="title">Create new definition</h1>
			<div class="input-with-labels">
				<label for="expression">Expression:</label>
				<input
					type="text"
					name="expression"
					required
					value={form?.data?.expression ?? ''}
					class:input-error={form?.errors?.email}
				/>
				{#if form?.errors?.expression}
					<label for="expression" class="error-label">
						{form.errors.expression.join(', ')}
					</label>
				{/if}
			</div>
			<div class="input-with-labels">
				<label for="definition">Definition:</label>
				<input
					type="text"
					name="definition"
					required
					value={form?.data?.definition ?? ''}
					class:input-error={form?.errors?.email}
				/>
				{#if form?.errors?.definition}
					<label for="definition" class="error-label">
						{form.errors.definition.join(', ')}
					</label>
				{/if}
			</div>
			<div class="input-with-labels">
				<label for="example">Example usage:</label>
				<input
					type="text"
					name="example"
					value={form?.data?.example ?? ''}
					class:input-error={form?.errors?.email}
				/>
				{#if form?.errors?.example}
					<label for="example" class="error-label">
						{form.errors.example.join(', ')}
					</label>
				{/if}
			</div>
			<input hidden type="text" name="author_id" value={data.session?.user.id} />
			<button type="submit">Create</button>
		</form>
	</div>
</div>

<style>
	.error-label {
		color: var(--cancel);
		text-shadow: var(--shadow);
	}
	.input-error {
		outline: 2px solid var(--cancel);
	}
</style>
