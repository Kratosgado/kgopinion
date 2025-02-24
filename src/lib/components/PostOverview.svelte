<script lang="ts">
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils';

	let { post }: { post: Post } = $props();
</script>

<img src={post.featuredImage} alt={post.title} class="h-64 w-full rounded-md object-cover" />
<h3 class="mb-2 text-xl font-bold text-black"><a href={`/blog/${post.slug}`}>{post.title}</a></h3>
<p class="mb-4 text-gray-600">{post.excerpt}</p>
<p class="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
