<script lang="ts">
	import { getCategoryColor, Loading, SEO, type Category, type SEOMetadata } from '$lib';

	export let data: { categories: Category[] };
	const { categories } = data;
const metadata: SEOMetadata = {
    title: "Categories - KgOpinion",
    description: "View all categories of articles posted on KgOpinion",
    keywords: ['KgOpinion','blogger', 'categories', 'category']
  }
</script>

<SEO {metadata} />



<div class="container mx-auto py-12 px-4">
	<h1 class="text-4xl font-bold mb-8">Categories</h1>

	{#if !categories}
		<Loading />
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each categories as category}
				<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
					<div class="card-body">
						<h2 class="card-title text-2xl">{category.name}</h2>
						<div class="badge badge-{getCategoryColor(category.postCount)}">
							{category.postCount} articles
						</div>
						{#if category.description}
							<p class="mt-2">{category.description}</p>
						{/if}
						<div class="card-actions justify-end mt-4">
							<a
								href={`/articles/categories/${category.name.toLowerCase()}`}
								class="btn btn-primary">View Articles</a
							>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
