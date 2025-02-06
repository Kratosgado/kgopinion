<!-- src/routes/PostView.svelte -->
<script lang="ts">
  import type { Post } from '$lib/types';

  export let post: Post;

  // Convert Firebase Timestamp to a locale date string.
  function formatDate(timestamp: any): string {
    return new Date(timestamp.seconds * 1000).toLocaleDateString();
  }
</script>

<article class="container mx-auto p-4">
  <div class="card bg-base-100 shadow-xl">
    {#if post.featuredImage}
      <figure>
        <img src={post.featuredImage} alt={post.title} class="object-cover w-full h-64" />
      </figure>
    {/if}
    <div class="card-body">
      <h1 class="card-title text-3xl font-bold">{post.title}</h1>
      <div class="flex items-center text-sm text-gray-500">
        <span>By {post.author}</span>
        <span class="mx-2">•</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      <div class="prose max-w-none mt-4">
        {@html post.content}
      </div>
      {#if post.categories.length}
        <div class="mt-4">
          {#each post.categories as category}
            <span class="badge badge-secondary mr-2">{category}</span>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</article>

<style>
  article {
    max-width: 800px;
  }
</style>
