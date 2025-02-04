<!-- src/routes/+page.svelte -->
<script lang="ts">
	export let data: {
		posts: Array<{ id: string; title: string; excerpt: string; createdAt: Date }>;
	};

	// Format date for display
	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date);
	}
</script>

<section class="hero bg-gradient-to-r from-indigo-500 to-purple-500 py-16 text-white">
	<div class="container mx-auto text-center">
		<h1 class="mb-4 text-4xl font-bold">Welcome to My Blog</h1>
		<p class="mb-8 text-lg">
			Explore programming and science topics in an engaging and informative way.
		</p>
		<a
			href="/posts"
			class="rounded-md bg-white px-4 py-2 text-indigo-500 hover:bg-indigo-500 hover:text-white"
		>
			View All Posts
		</a>
	</div>
</section>

<section class="recent-posts my-16">
	<div class="container mx-auto">
		<h2 class="mb-8 text-3xl font-bold">Recent Posts</h2>
		<ul class="grid grid-cols-1 gap-8 md:grid-cols-3">
			{#each data.posts as post}
				<li class="rounded-md bg-white p-6 shadow-md">
					<h3 class="mb-2 text-xl font-bold"><a href={`/post/${post.id}`}>{post.title}</a></h3>
					<p class="mb-4 text-gray-600">{post.excerpt}</p>
					<p class="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>
