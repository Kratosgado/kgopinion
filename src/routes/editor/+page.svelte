<script lang="ts">
	import Details from './Details.svelte';
	import EditorPage from './EditorPage.svelte';
	import Preview from './Preview.svelte';

	let showPreview = $state(false);
	$inspect(showPreview);
</script>

<div class="min-h-screen bg-base-200 p-4">
	<div class="flex flex-row gap-4">
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
