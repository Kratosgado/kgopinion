<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
	import type { Post } from '$lib';
 
  // State
  let posts: Post[] = [];
  let isLoading = true;
  let activeTab = 'published';
  let searchQuery = '';
  
  // Computed properties
  $: filteredPosts = posts.filter(post => {
    // Filter by tab
    if (activeTab === 'published' && !post.published) return false;
    if (activeTab === 'drafts' && post.published) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  $: publishedCount = posts.filter(post => post.published).length;
  $: draftCount = posts.filter(post => !post.published).length;
  
  onMount(async () => {
    try {
      // In a real app, you would fetch the author's posts from your API
      // For example:
      // const userPosts = await fetchUserPosts();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample posts data
      posts = [
        {
          title: "Getting Started with Svelte",
          slug: "getting-started-with-svelte",
          excerpt: "Learn how to build reactive web applications with Svelte framework.",
          featuredImage: "https://picsum.photos/seed/svelte/800/600",
          categories: ["Development", "Frontend"],
          keywords: ["svelte", "javascript", "frontend"],
          createdAt: new Date("2023-05-15"),
          updatedAt: new Date("2023-05-15"),
          publishedAt: new Date("2023-05-15"),
          published: true,
          authorId: "author1",
          likeCount: 42,
          commentCount: 7,
          readTime: 5,
          content: ""
        },
        {
          title: "The Power of DaisyUI",
          slug: "the-power-of-daisyui",
          excerpt: "Discover how DaisyUI can streamline your Tailwind CSS workflow.",
          featuredImage: "https://picsum.photos/seed/daisyui/800/600",
          categories: ["Design", "Frontend"],
          keywords: ["daisyui", "tailwind", "css"],
          createdAt: new Date("2023-06-02"),
          updatedAt: new Date("2023-06-02"),
          publishedAt: new Date("2023-06-02"),
          published: true,
          authorId: "author1",
          likeCount: 28,
          commentCount: 4,
          readTime: 4,
          content: ""
        },
        {
          title: "Advanced Svelte Techniques",
          slug: "advanced-svelte-techniques",
          excerpt: "Take your Svelte skills to the next level with these advanced techniques.",
          featuredImage: "https://picsum.photos/seed/advanced/800/600",
          categories: ["Development", "Frontend"],
          keywords: ["svelte", "advanced", "techniques"],
          createdAt: new Date("2023-07-10"),
          updatedAt: new Date("2023-07-10"),
          published: false,
          authorId: "author1",
          likeCount: 0,
          commentCount: 0,
          readTime: 8,
          content: ""
        },
        {
          title: "Building a Blog with SvelteKit",
          slug: "building-a-blog-with-sveltekit",
          excerpt: "A comprehensive guide to creating a blog using SvelteKit and Firebase.",
          featuredImage: "https://picsum.photos/seed/blog/800/600",
          categories: ["Development", "Tutorial"],
          keywords: ["sveltekit", "blog", "firebase"],
          createdAt: new Date("2023-08-05"),
          updatedAt: new Date("2023-08-05"),
          published: false,
          authorId: "author1",
          likeCount: 0,
          commentCount: 0,
          readTime: 12,
          content: ""
        }
      ];
    } catch (err) {
      console.error(err);
    } finally {
      isLoading = false;
    }
  });
  
  function createNewPost() {
    goto('/editor');
  }
  
  function editPost(slug: string) {
    goto(`/editor/${slug}`);
  }
  
  function viewPost(slug: string) {
    goto(`/articles/${slug}`);
  }
  
  async function togglePublishStatus(post: Post) {
    // In a real app, you would update the post status in your API
    // For example:
    // await updatePostStatus(post.id, !post.published);
    
    // Update locally for demo
    post.published = !post.published;
    
    if (post.published) {
      post.publishedAt = new Date();
    } else {
      post.publishedAt = undefined;
    }
    
    // Force reactivity
    posts = [...posts];
  }
  
  async function deletePost(postToDelete: Post) {
    if (!confirm(`Are you sure you want to delete "${postToDelete.title}"? This action cannot be undone.`)) {
      return;
    }
    
    // In a real app, you would delete the post from your API
    // For example:
    // await deletePostFromDatabase(postToDelete.id);
    
    // Update locally for demo
    posts = posts.filter(post => post.slug !== postToDelete.slug);
  }
</script>

<svelte:head>
  <title>Author Dashboard - KgOpinion</title>
</svelte:head>

<div class="container mx-auto py-12 px-4">
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    <h1 class="text-4xl font-bold">Author Dashboard</h1>
    
    <button class="btn btn-primary" on:click={createNewPost}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      Create New Post
    </button>
  </div>
  
  <!-- Stats Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="card bg-primary text-primary-content">
      <div class="card-body">
        <h2 class="card-title">Total Posts</h2>
        <p class="text-4xl font-bold">{posts.length}</p>
      </div>
    </div>
    
    <div class="card bg-success text-success-content">
      <div class="card-body">
        <h2 class="card-title">Published</h2>
        <p class="text-4xl font-bold">{publishedCount}</p>
      </div>
    </div>
    
    <div class="card bg-secondary text-secondary-content">
      <div class="card-body">
        <h2 class="card-title">Drafts</h2>
        <p class="text-4xl font-bold">{draftCount}</p>
      </div>
    </div>
  </div>
  
  <!-- Search and Filters -->
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
    <div class="tabs tabs-boxed">
      <button 
        class={`tab ${activeTab === 'published' ? 'tab-active' : ''}`} 
        on:click={() => activeTab = 'published'}
      >
        Published ({publishedCount})
      </button>
      <button 
        class={`tab ${activeTab === 'drafts' ? 'tab-active' : ''}`} 
        on:click={() => activeTab = 'drafts'}
      >
        Drafts ({draftCount})
      </button>
      <button 
        class={`tab ${activeTab === 'all' ? 'tab-active' : ''}`} 
        on:click={() => activeTab = 'all'}
      >
        All Posts ({posts.length})
      </button>
    </div>
    
    <div class="form-control w-full md:w-auto">
      <div class="input-group">
        <input 
          type="text" 
          bind:value={searchQuery} 
          placeholder="Search posts..." 
          class="input input-bordered" 
        />
        <button aria-label="search" class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
      </div>
    </div>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center items-center py-12">
      <div class="loading loading-spinner loading-lg"></div>
    </div>
  {:else if filteredPosts.length === 0}
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body text-center py-16">
        <h2 class="text-2xl font-bold mb-2">No posts found</h2>
        {#if searchQuery}
          <p>No posts match your search criteria. Try a different search term.</p>
        {:else if activeTab === 'published'}
          <p>You don't have any published posts yet.</p>
          <button class="btn btn-primary mt-4 mx-auto" on:click={createNewPost}>Create Your First Post</button>
        {:else if activeTab === 'drafts'}
          <p>You don't have any drafts.</p>
          <button class="btn btn-primary mt-4 mx-auto" on:click={createNewPost}>Create New Post</button>
        {:else}
          <p>You don't have any posts yet.</p>
          <button class="btn btn-primary mt-4 mx-auto" on:click={createNewPost}>Create Your First Post</button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th class="hidden md:table-cell">Date</th>
            <th class="hidden md:table-cell">Categories</th>
            <th class="hidden md:table-cell">Stats</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredPosts as post}
            <tr>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src={post.featuredImage || "/placeholder.svg"} alt={post.title} />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{post.title}</div>
                    <div class="text-sm opacity-50 truncate max-w-xs">{post.excerpt}</div>
                  </div>
                </div>
              </td>
              <td class="hidden md:table-cell">
                {post.published 
                  ? `Published on ${post.publishedAt?.toLocaleDateString()}` 
                  : `Last updated ${post.updatedAt.toLocaleDateString()}`}
              </td>
              <td class="hidden md:table-cell">
                <div class="flex flex-wrap gap-1">
                  {#each post.categories.slice(0, 2) as category}
                    <div class="badge badge-outline">{category}</div>
                  {/each}
                  {#if post.categories.length > 2}
                    <div class="badge badge-outline">+{post.categories.length - 2}</div>
                  {/if}
                </div>
              </td>
              <td class="hidden md:table-cell">
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1" title="Likes">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    {post.likeCount}
                  </div>
                  <div class="flex items-center gap-1" title="Comments">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    {post.commentCount}
                  </div>
                  <div class="flex items-center gap-1" title="Read Time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {post.readTime} min
                  </div>
                </div>
              </td>
              <td>
                <div class="badge {post.published ? 'badge-success' : 'badge-secondary'}">
                  {post.published ? 'Published' : 'Draft'}
                </div>
              </td>
              <td>
                <div class="dropdown dropdown-end">
                  <label for="" tabindex="-1" class="btn btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </label>
                  <ul tabindex="-2" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button on:click={() => editPost(post.slug)}>Edit</button></li>
                    {#if post.published}
                      <li><button on:click={() => viewPost(post.slug)}>View</button></li>
                      <li><button on:click={() => togglePublishStatus(post)}>Unpublish</button></li>
                    {:else}
                      <li><button on:click={() => togglePublishStatus(post)}>Publish</button></li>
                    {/if}
                    <li><button class="text-error" on:click={() => deletePost(post)}>Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
