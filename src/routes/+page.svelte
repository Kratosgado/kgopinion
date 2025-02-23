<script lang="ts">
	import PostOverview from '$lib/components/PostOverview.svelte';
	import type { Post } from '$lib/types';

	export let data: { posts: Post[] };
</script>

<section class="hero w-auto bg-gradient-to-r from-indigo-500 to-purple-500 py-16 text-white">
	<div class="container mx-auto text-center">
		<h1 class="mb-4 text-4xl font-bold">Welcome to My Blog</h1>
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
