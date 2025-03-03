<script lang="ts">
	import type { SEOMetadata } from '$lib/seo';
	import SEO from '$lib/seo/Head.svelte';
	import type { Post } from '../../../lib/types';
	import { formatDate } from '../../../lib/utils';

	export let data: { post: Post };
	const { post } = data;
	const metadata: SEOMetadata = {
		title: post.title,
		description: post.excerpt,
		keywords: post.keywords || [],
		type: 'article',
		ogImage: post.featuredImage,
		publishedTime: post.createdAt.toUTCString(),
		modifiedTime: post.updatedAt.toUTCString(),
		author: post.author
	};
</script>

<SEO {metadata} />

<article class="container mx-auto p-4">
	<div class="card bg-base-300 shadow-xl">
		{#if data.post.featuredImage}
			<figure>
				<img src={data.post.featuredImage} alt={data.post.title} class="h-64 w-full object-cover" />
			</figure>
		{/if}
		<div class="card-body">
			<h1 class="card-title text-3xl font-bold">{data.post.title}</h1>
			<div class="flex items-center text-sm text-gray-500">
				<span>By {data.post.author}</span>
				<span class="mx-2">•</span>
				<span>{formatDate(data.post.createdAt)}</span>
			</div>
			<div class="prose mt-4 max-w-none">
				{@html post.content}
			</div>
			{#if data.post.categories.length}
				<div class="mt-4">
					{#each data.post.categories as category}
						<span class="badge badge-secondary mr-2">{category}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</article>

<style>
	article {
		max-width: 1100px;
	}
</style>
