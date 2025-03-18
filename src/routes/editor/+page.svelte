<script lang="ts">
	import { auth } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';
	import Details from './Details.svelte';
	import EditorPage from './EditorPage.svelte';
	import Preview from './Preview.svelte';
	import { post } from './post.svelte';

	let showPreview = $state(false);
	let unsubscribe: Unsubscriber;

	onMount(async () => {
		unsubscribe = auth.subscribe((v) => {
			post.author = v.user!;
			post.authorId = v.user!.id;
		});

		onDestroy(() => unsubscribe && unsubscribe());
	});
</script>

<div class="min-h-screen bg-base-300 p-4">
	<div class="flex flex-row justify-center gap-4">
		<!-- <Elements /> -->
		{#if showPreview}
			<Preview togglePreview={() => (showPreview = !showPreview)} />
		{:else}
			<div>
				<EditorPage />
			</div>
			<Details togglePreview={() => (showPreview = !showPreview)} />
		{/if}
	</div>
</div>
