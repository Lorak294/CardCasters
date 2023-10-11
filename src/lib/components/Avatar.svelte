<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';

	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data /*error*/ } = await supabase.storage.from('avatars').getPublicUrl(path);
			//if (error) throw error;

			//const url = URL.createObjectURL(data.publicUrl);
			avatarUrl = data.publicUrl;
		} catch (err) {
			if (err instanceof Error) {
				console.error('Error downloading image: ', err.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);
			if (error) throw error;

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="center">
	{#if avatarUrl}
		<img src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} class="avatar image" />
	{:else}
		<div class="avatar no-image center">No image</div>
	{/if}
	<input type="hidden" name="avatar_url" value={url} />

	<div class="center">
		<label class="button primary block" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>

<style>
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1em;
	}

	.avatar {
		width: 300px;
		height: 300px;
	}

	.image {
		background-color: rgb(0, 160, 107);
	}

	.no-image {
		background-color: rgb(133, 70, 11);
		text-align: center;
	}
</style>
