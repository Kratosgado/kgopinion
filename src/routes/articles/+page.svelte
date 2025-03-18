<script lang="ts">
	import { Loading, type Post } from '$lib';

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
</script>

<svelte:head>
	<title>Articles - KgOpinion</title>
	<meta name="description" content="Browse all articles on KgOpinion" />
</svelte:head>

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
				<div class="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow">
					<figure>
						<img
							src={post.featuredImage || '/favicon.png'}
							alt={post.title}
							class="h-48 w-full object-cover"
						/>
					</figure>
					<div class="card-body">
						<div class="flex flex-wrap gap-2 mb-2">
							{#each post.categories as category}
								<div class="badge badge-primary">{category}</div>
							{/each}
						</div>
						<h2 class="card-title">{post.title}</h2>
						<p>{post.excerpt}</p>
						<div class="flex justify-between items-center mt-4 text-sm text-gray-500">
							<div class="flex items-center gap-2">
								<img
									src={post.author?.avatar || '/placeholder.svg'}
									alt={post.author?.name}
									class="w-6 h-6 rounded-full"
								/>
								<span>{post.author?.name}</span>
							</div>
							<span>{post.readTime} min read</span>
						</div>
						<div class="flex justify-between items-center mt-2 text-sm text-gray-500">
							<span>{post.publishedAt?.toLocaleDateString()}</span>
							<div class="flex items-center gap-4">
								<div class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path
											d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
										></path></svg
									>
									{post.likeCount}
								</div>
								<div class="flex items-center gap-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										><path
											d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
										></path></svg
									>
									{post.commentCount}
								</div>
							</div>
						</div>
						<div class="card-actions justify-end mt-4">
							<a href={`/${post.slug}`} class="btn btn-primary">Read More</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
