<script lang="ts">
  import { page } from '$app/stores';
	import type { Post } from '$lib';
  import { onMount } from 'svelte';

  // Get the current slug from the URL
  const slug = $page.params.slug;
  
  // Post data (in a real app, you would fetch this based on the slug)
  let post: Post;
  let comments: Comment[] = [];
  let relatedPosts: Post[] = [];
  let newComment = '';
  
  // Simulate fetching post data
  onMount(async () => {
    // In a real app, you would fetch the post data from your API
    post = {
      title: "Getting Started with Svelte",
      slug: "getting-started-with-svelte",
      content: `
        <p>Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.</p>
        
        <p>Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.</p>
        
        <h2>Why Svelte?</h2>
        
        <p>Svelte has several advantages over other frameworks:</p>
        
        <ul>
          <li>No virtual DOM overhead</li>
          <li>Truly reactive</li>
          <li>Less code to write</li>
          <li>No complex state management libraries needed</li>
        </ul>
      `,
      excerpt: "Learn how to build reactive web applications with Svelte framework.",
      publishedAt: new Date("2023-05-15"),
      published: true,
      createdAt: new Date("2023-05-10"),
      updatedAt: new Date("2023-05-15"),
      authorId: "author1",
      author: {
        id: "author1",
        name: "Jane Doe",
        email: "jane@example.com",
        bio: "Frontend developer and technical writer",
        avatar: "https://i.pravatar.cc/150?u=jane",
        social: {
          twitter: "janedoe",
          github: "janedoe",
          linkedIn: "jane-doe"
        }
      },
      categories: ["Development", "Frontend"],
      keywords: ["svelte", "javascript", "frontend", "web development"],
      featuredImage: "https://picsum.photos/seed/svelte/1200/600",
      readTime: 5,
      likeCount: 42,
      commentCount: 7,
      relatedPosts: ["the-power-of-daisyui", "web-performance-optimization"]
    };
    
    // Simulate fetching comments
    comments = [
      {
        id: "comment1",
        postId: slug,
        authorName: "John Smith",
        authorAvatar: "https://i.pravatar.cc/150?u=john",
        content: "Great article! I've been using Svelte for a few months now and I love it.",
        createdAt: new Date("2023-05-16T10:30:00"),
        updatedAt: new Date("2023-05-16T10:30:00"),
        likes: 5
      },
      {
        id: "comment2",
        postId: slug,
        authorName: "Alice Johnson",
        authorAvatar: "https://i.pravatar.cc/150?u=alice",
        content: "I'm new to Svelte. This was very helpful, thanks!",
        createdAt: new Date("2023-05-17T14:20:00"),
        updatedAt: new Date("2023-05-17T14:20:00"),
        likes: 3
      },
      {
        id: "comment3",
        postId: slug,
        authorName: "Bob Williams",
        authorAvatar: "https://i.pravatar.cc/150?u=bob",
        content: "How does Svelte compare to React in terms of performance?",
        createdAt: new Date("2023-05-18T09:15:00"),
        updatedAt: new Date("2023-05-18T09:15:00"),
        likes: 2,
        parentId: "comment1"
      }
    ];
    
    // Simulate fetching related posts
    relatedPosts = [
      {
        title: "The Power of DaisyUI",
        slug: "the-power-of-daisyui",
        excerpt: "Discover how DaisyUI can streamline your Tailwind CSS workflow.",
        featuredImage: "https://picsum.photos/seed/daisyui/800/600",
        categories: ["Design"],
        createdAt: new Date("2023-06-02"),
        updatedAt: new Date("2023-06-02"),
        published: true,
        authorId: "author2",
        likeCount: 28,
        commentCount: 4,
        readTime: 4,
        content: ""
      },
      {
        title: "Web Performance Optimization",
        slug: "web-performance-optimization",
        excerpt: "Tips and tricks to make your web applications blazing fast.",
        featuredImage: "https://picsum.photos/seed/performance/800/600",
        categories: ["Performance"],
        createdAt: new Date("2023-07-10"),
        updatedAt: new Date("2023-07-10"),
        published: true,
        authorId: "author3",
        likeCount: 35,
        commentCount: 9,
        readTime: 7,
        content: ""
      }
    ];
  });
  
  function handleLike() {
    if (post) {
      post.likeCount += 1;
      // In a real app, you would send this to your API
    }
  }
  
  function submitComment() {
    if (newComment && post) {
      const comment: Comment = {
        id: `comment${comments.length + 1}`,
        postId: post.slug,
        authorName: "Current User", // In a real app, this would be the logged-in user
        authorAvatar: "https://i.pravatar.cc/150?u=user",
        content: newComment,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0
      };
      
      comments = [comment, ...comments];
      post.commentCount += 1;
      newComment = '';
      
      // In a real app, you would send this to your API
    }
  }
  
  function likeComment(commentId: string) {
    comments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    
    // In a real app, you would send this to your API
  }
</script>

<svelte:head>
  <title>{post ? post.title : 'Loading...'} - BlogFolio</title>
  {#if post}
    <meta name="description" content={post.excerpt} />
    <meta name="keywords" content={post.keywords.join(', ')} />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.excerpt} />
    <meta property="og:image" content={post.featuredImage} />
    <meta property="og:type" content="article" />
    <meta property="article:published_time" content={post.publishedAt?.toISOString()} />
    <meta property="article:modified_time" content={post.updatedAt.toISOString()} />
    <meta property="article:author" content={post.author?.name} />
    {#each post.keywords as keyword}
      <meta property="article:tag" content={keyword} />
    {/each}
  {/if}
</svelte:head>

{#if post}
  <!-- Post Header -->
  <div class="w-full h-[40vh] relative">
    <img src={post.featuredImage || "/placeholder.svg"} alt={post.title} class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="text-center text-white px-4 max-w-4xl">
        <div class="flex flex-wrap justify-center gap-2 mb-4">
          {#each post.categories as category}
            <div class="badge badge-primary">{category}</div>
          {/each}
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div class="flex items-center justify-center gap-4 text-sm">
          <div class="flex items-center gap-2">
            <img src={post.author?.avatar || "/placeholder.svg"} alt={post.author?.name} class="w-8 h-8 rounded-full" />
            <span>{post.author?.name}</span>
          </div>
          <span class="mx-2">•</span>
          <span>{post.publishedAt?.toLocaleDateString()}</span>
          <span class="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </div>
  </div>
  
  <main class="container mx-auto py-10 px-4">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Article Content -->
        <article class="prose prose-lg max-w-none">
          {#if post.excerpt}
            <p class="text-xl font-medium italic lead">{post.excerpt}</p>
            <hr class="my-6" />
          {/if}
          
          {@html post.content}
        </article>
        
        <!-- Article Footer -->
        <div class="mt-8 pt-6 border-t flex flex-wrap justify-between items-center">
          <div class="flex items-center gap-4">
            <button class="btn btn-outline gap-2" on:click={handleLike}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              {post.likeCount} Likes
            </button>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              {post.commentCount} Comments
            </div>
          </div>
          
          <div class="flex gap-2 mt-4 sm:mt-0">
            <a href="#" class="btn btn-circle btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" class="btn btn-circle btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" class="btn btn-circle btn-sm btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
        
        <!-- Author Bio -->
        {#if post.author}
          <div class="mt-8 p-6 bg-base-200 rounded-lg flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} class="w-24 h-24 rounded-full" />
            <div>
              <h3 class="text-xl font-bold mb-2">About {post.author.name}</h3>
              <p class="mb-4">{post.author.bio || 'No bio available.'}</p>
              <div class="flex gap-2">
                {#if post.author.social?.twitter}
                  <a href={`https://twitter.com/${post.author.social.twitter}`} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">Twitter</a>
                {/if}
                {#if post.author.social?.github}
                  <a href={`https://github.com/${post.author.social.github}`} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">GitHub</a>
                {/if}
                {#if post.author.social?.linkedIn}
                  <a href={`https://linkedin.com/in/${post.author.social.linkedIn}`} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">LinkedIn</a>
                {/if}
              </div>
            </div>
          </div>
        {/if}
        
        <!-- Comments Section -->
        <div class="mt-12">
          <h3 class="text-2xl font-bold mb-6">Comments ({post.commentCount})</h3>
          
          <!-- Comment Form -->
          <div class="mb-8">
            <textarea 
              bind:value={newComment} 
              placeholder="Leave a comment..." 
              class="textarea textarea-bordered w-full h-24"
            ></textarea>
            <div class="flex justify-end mt-2">
              <button class="btn btn-primary" on:click={submitComment}>Post Comment</button>
            </div>
          </div>
          
          <!-- Comments List -->
          <div class="space-y-6">
            {#each comments.filter(c => !c.parentId) as comment}
              <div class="bg-base-100 p-4 rounded-lg shadow-sm">
                <div class="flex items-start gap-4">
                  <img src={comment.authorAvatar || "/placeholder.svg"} alt={comment.authorName} class="w-10 h-10 rounded-full" />
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-2">
                      <div>
                        <span class="font-bold">{comment.authorName}</span>
                        <span class="text-sm text-gray-500 ml-2">{comment.createdAt.toLocaleDateString()}</span>
                      </div>
                      <button class="btn btn-ghost btn-xs gap-1" on:click={() => likeComment(comment.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                        {comment.likes}
                      </button>
                    </div>
                    <p>{comment.content}</p>
                    
                    <!-- Replies -->
                    {#each comments.filter(c => c.parentId === comment.id) as reply}
                      <div class="mt-4 ml-6 p-3 bg-base-200 rounded-lg">
                        <div class="flex items-start gap-3">
                          <img src={reply.authorAvatar || "/placeholder.svg"} alt={reply.authorName} class="w-8 h-8 rounded-full" />
                          <div class="flex-1">
                            <div class="flex justify-between items-center mb-1">
                              <div>
                                <span class="font-bold">{reply.authorName}</span>
                                <span class="text-sm text-gray-500 ml-2">{reply.createdAt.toLocaleDateString()}</span>
                              </div>
                              <button class="btn btn-ghost btn-xs gap-1" on:click={() => likeComment(reply.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                {reply.likes}
                              </button>
                            </div>
                            <p>{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Sidebar -->
      <div class="lg:col-span-1">
        <!-- Keywords -->
        {#if post.keywords.length > 0}
          <div class="bg-base-100 shadow-xl rounded-box p-6 mb-8">
            <h3 class="text-xl font-bold mb-4">Keywords</h3>
            <div class="flex flex-wrap gap-2">
              {#each post.keywords as keyword}
                <span class="badge badge-outline">{keyword}</span>
              {/each}
            </div>
          </div>
        {/if}
        
        <!-- Related Posts -->
        {#if relatedPosts.length > 0}
          <div class="bg-base-100 shadow-xl rounded-box p-6 mb-8">
            <h3 class="text-xl font-bold mb-4">Related Posts</h3>
            <div class="space-y-6">
              {#each relatedPosts as relatedPost}
                <div class="flex gap-4">
                  <img src={relatedPost.featuredImage || "/placeholder.svg"} alt={relatedPost.title} class="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <div class="badge badge-sm mb-1">{relatedPost.categories[0]}</div>
                    <h4 class="font-bold hover:text-primary">
                      <a href={`/${relatedPost.slug}`}>{relatedPost.title}</a>
                    </h4>
                    <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{relatedPost.readTime} min read</span>
                      <span>•</span>
                      <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {relatedPost.likeCount}
                      </div>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </main>
{:else}
  <div class="container mx-auto py-20 px-4 text-center">
    <div class="loading loading-spinner loading-lg"></div>
    <p class="mt-4">Loading post...</p>
  </div>
{/if}
