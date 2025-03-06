<script lang="ts">
	import PostOverview from '$lib/components/PostOverview.svelte';
	import type { Post } from '$lib/types';
	export let data: { posts: Post[] };
</script>

<svelte:head>
	<title>Articles - BlogFolio</title>
</svelte:head>

<div class="container mx-auto py-12 px-4">
	<h1 class="text-4xl font-bold mb-8">Articles</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{#each data.posts as post}
			<PostOverview {post} />
		{/each}
	</div>
</div>
