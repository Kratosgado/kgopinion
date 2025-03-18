<script lang="ts">
	import { Loading, PostOverview, SEO, type Post, type SEOMetadata } from '$lib';

	export let data: { posts: Post[] };
	const { posts } = data;
	let selectedCategory = 'all';

	// Get unique categories from posts
	$: categories = ['all', ...new Set(posts.flatMap((post) => post.categories))];

	// Filter posts by selected category
	$: filteredPosts =
		selectedCategory === 'all'
			? posts
			: posts.filter((post) => post.categories.includes(selectedCategory));
  const metadata: SEOMetadata = {
    title: "Articles - KgOpinion",
    description: "Browse all articles on KgOpinion",
    keywords: ['articles', 'posts', 'science', 'programming']
  }
</script>

<SEO {metadata} />

<div class="container mx-auto py-12 px-4">
	<h1 class="text-4xl font-bold mb-8">Articles</h1>

	<!-- Category Filter -->
	<div class="mb-8">
		<div class="flex flex-wrap gap-2">
			{#each categories as category}
				<button
					class="btn btn-sm {selectedCategory === category ? 'btn-primary' : 'btn-outline'}"
					on:click={() => (selectedCategory = category)}
				>
					{category === 'all' ? 'All Categories' : category}
				</button>
			{/each}
		</div>
	</div>

	{#if !posts}
		<Loading />
	{:else if filteredPosts.length === 0}
		<div class="text-center py-12">
			<h3 class="text-2xl font-bold mb-4">No articles found</h3>
			<p>There are no articles in this category yet.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredPosts as post}
        <PostOverview {post} />
							{/each}
		</div>
	{/if}
</div>
