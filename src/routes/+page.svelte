<script lang="ts">
	import PostOverview from '$lib/components/PostOverview.svelte';
	import { getCategoryColor, SEO, type Category, type Post, type SEOMetadata } from '$lib';

	export let data: { posts: Post[]; categories: Category[] };

	let email = '';

	function handleSubscribe() {
		alert(`Thank you for subscribing with ${email}!`);
		email = '';
	}

	const metadata: SEOMetadata = {
		title: 'Kgopinion',
		description: 'Explore programming and science topics in an engaging and informative way',
		keywords: ['programming', 'science', 'development', 'software', 'technology'],
		type: 'website',
		ogImage: 'https://kgopinion.pages.dev/favicon.png',
		author: 'Kratosgado'
	};
</script>

<SEO {metadata} />

<div class="flex min-h-screen flex-col">
	<!-- Hero Section -->
	<div class="hero min-h-[35vh] bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-4xl font-bold">Welcome to KgOpinion</h1>
				<p class="py-6">
					Discover insightful articles on web development, design, and technology. Stay updated with
					the latest trends and best practices.
				</p>
				<button class="btn btn-primary">Get Started</button>
			</div>
		</div>
	</div>

	<main class="container mx-auto flex-grow px-4 py-10">
		<!-- Featured Posts -->
		<section class="mb-16">
			<div class="mb-8 flex items-center justify-between">
				<h2 class="text-3xl font-bold">Featured Posts</h2>
				<a href="/articles" class="btn btn-outline btn-sm">View All</a>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each data.posts as post}
					<PostOverview {post} />
				{/each}
			</div>
		</section>

		<!-- Categories and Newsletter -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Categories -->
			<div class="lg:col-span-1">
				<div class="rounded-box bg-base-100 p-6 shadow-xl">
					<h3 class="mb-6 text-2xl font-bold">Categories</h3>
					<div class="space-y-4">
						{#each data.categories as category}
							<div class="flex items-center justify-between">
								<span class="text-lg">{category.name}</span>
								<span class="badge badge-{getCategoryColor(category.postCount)}"
									>{category.postCount}</span
								>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Newsletter -->
			<div class="lg:col-span-2">
				<div class="rounded-box bg-base-100 p-8 shadow-xl">
					<h3 class="mb-4 text-2xl font-bold">Subscribe to our Newsletter</h3>
					<p class="mb-6">Get the latest posts and updates delivered straight to your inbox.</p>
					<form on:submit|preventDefault={handleSubscribe} class="flex flex-col gap-4 sm:flex-row">
						<input
							type="email"
							bind:value={email}
							placeholder="Enter your email"
							class="input input-bordered w-full"
							required
						/>
						<button type="submit" class="btn btn-primary whitespace-nowrap">Subscribe</button>
					</form>
				</div>
			</div>
		</div>
	</main>
</div>
