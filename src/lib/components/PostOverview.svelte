<script lang="ts">
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let { post }: { post: Post } = $props();
</script>

<div class="card h-full bg-base-100 shadow-xl">
	<figure>
		<img
			src={post.featuredImage || '/placeholder.svg'}
			alt={post.title}
			class="h-48 w-full object-cover"
		/>
	</figure>
	<div class="card-body">
		<div class="badge badge-secondary mb-2">{post.categories}</div>
		<a href={`/blog/${post.slug}`}><h3 class="card-title">{post.title}</h3></a>
		<p>{post.excerpt}</p>
		<div class="mt-4 flex items-center text-sm text-gray-500">
			<span>{formatDate(post.createdAt)}</span>
			<span class="mx-2">•</span>
			<span>By {post.author}</span>
		</div>
		<div class="card-actions mt-4 justify-end">
			<button class="btn btn-primary btn-sm">Read More</button>
		</div>
	</div>
</div>
