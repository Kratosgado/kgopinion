<script lang="ts">
	import PostOverview from '$lib/components/PostOverview.svelte';
	import type { Post } from '$lib/types';
	import SEO from '$lib/seo/Head.svelte';
	import type { SEOMetadata } from '$lib/seo';

	export let data: { posts: Post[] };

	const metadata: SEOMetadata = {
		title: 'Kgopinion',
		description: 'Explore programming and science topics in an engaging and informative way',
		keywords: ['programming', 'science', 'development', 'software', 'technology'],
		type: 'website',
		ogImage: '../../static/favicon.png',
		author: 'Kratosgado'
	};
</script>

<SEO {metadata} />

<section class="hero w-auto bg-gradient-to-r from-indigo-500 to-purple-500 py-16 text-white">
	<div class="container mx-auto text-center">
		<h1 class="mb-4 text-4xl font-bold">Welcome to Kgopinion</h1>
		<p class="mb-8 text-lg">
			Explore programming and science topics in an engaging and informative way.
		</p>
		<a
			href="/blog"
			class="btn bg-white px-4 py-2 text-indigo-500 hover:bg-indigo-500 hover:text-white"
		>
			View All Posts
		</a>
	</div>
</section>

<section class="rcent-posts my-16">
	<div class="container mx-auto">
		<h2 class="mb-8 text-3xl font-bold">Recent Posts</h2>
		<ul class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each data.posts as post}
				<li class="rounded-md bg-current p-6 shadow-md">
					<PostOverview {post} />
				</li>
			{/each}
		</ul>
	</div>
</section>
