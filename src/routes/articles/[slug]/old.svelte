<script lang="ts">
	import { page } from '$app/state';
	import { type Post, type SEOMetadata, SEO, formatDate } from '$lib';

	// In a real app, you would fetch this data based on the slug
	// For this example, we'll use a static object
	const posts = {
		'getting-started-with-svelte': {
			title: 'Getting Started with Svelte',
			image: 'https://picsum.photos/seed/svelte/1200/600',
			category: 'Development',
			date: 'May 15, 2023',
			author: 'Jane Doe',
			authorImage: 'https://i.pravatar.cc/150?u=jane',
			content: `
        <p class="mb-4">Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.</p>
        
        <p class="mb-4">Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Why Svelte?</h2>
        
        <p class="mb-4">Svelte has several advantages over other frameworks:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2">No virtual DOM overhead</li>
          <li class="mb-2">Truly reactive</li>
          <li class="mb-2">Less code to write</li>
          <li class="mb-2">No complex state management libraries needed</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
        
        <p class="mb-4">The easiest way to start building a Svelte app is to use the Svelte template:</p>
        
        <pre class="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
        </pre>
        
        <p class="mb-4">This will scaffold a new project in the <code>my-svelte-project</code> directory, install its dependencies, and start a server on localhost:5000.</p>
      `
		},
		'the-power-of-daisyui': {
			title: 'The Power of DaisyUI',
			image: 'https://picsum.photos/seed/daisyui/1200/600',
			category: 'Design',
			date: 'June 2, 2023',
			author: 'John Smith',
			authorImage: 'https://i.pravatar.cc/150?u=john',
			content: `
        <p class="mb-4">DaisyUI is a component library for Tailwind CSS that provides a set of high-quality UI components. It's designed to make your development process faster and more enjoyable.</p>
        
        <p class="mb-4">With DaisyUI, you can build beautiful interfaces without leaving your HTML or writing custom CSS.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Key Features</h2>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2">Pure CSS - no JavaScript dependencies</li>
          <li class="mb-2">Customizable with Tailwind CSS utilities</li>
          <li class="mb-2">Multiple themes with dark mode support</li>
          <li class="mb-2">Responsive components</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Installation</h2>
        
        <p class="mb-4">You can install DaisyUI as a Tailwind CSS plugin:</p>
        
        <pre class="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
npm install daisyui@latest
        </pre>
        
        <p class="mb-4">Then add it to your <code>tailwind.config.js</code> file:</p>
        
        <pre class="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
module.exports = {
  plugins: [require("daisyui")],
}
        </pre>
      `
		},
		'web-performance-optimization': {
			title: 'Web Performance Optimization',
			image: 'https://picsum.photos/seed/performance/1200/600',
			category: 'Performance',
			date: 'July 10, 2023',
			author: 'Alex Johnson',
			authorImage: 'https://i.pravatar.cc/150?u=alex',
			content: `
        <p class="mb-4">Web performance optimization is the practice of making websites load faster and run more efficiently. A fast website provides a better user experience, improves SEO rankings, and increases conversion rates.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Key Performance Metrics</h2>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>First Contentful Paint (FCP)</strong>: When the browser renders the first bit of content</li>
          <li class="mb-2"><strong>Largest Contentful Paint (LCP)</strong>: When the largest content element becomes visible</li>
          <li class="mb-2"><strong>First Input Delay (FID)</strong>: How long it takes for the page to respond to user interactions</li>
          <li class="mb-2"><strong>Cumulative Layout Shift (CLS)</strong>: Measures visual stability</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Optimization Techniques</h2>
        
        <h3 class="text-xl font-bold mt-6 mb-3">1. Optimize Images</h3>
        <p class="mb-4">Images often account for most of the downloaded bytes on a webpage. Optimizing them can significantly improve load times:</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Use modern formats like WebP</li>
          <li>Implement responsive images with srcset</li>
          <li>Lazy load images that are not in the viewport</li>
        </ul>
        
        <h3 class="text-xl font-bold mt-6 mb-3">2. Minimize HTTP Requests</h3>
        <p class="mb-4">Each resource your page requests adds to the load time. Reduce requests by:</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Combining CSS and JavaScript files</li>
          <li>Using CSS sprites for icons</li>
          <li>Implementing code splitting</li>
        </ul>
      `
		}
	};

	// Get the current slug from the URL
	const slug = page.params.slug;

	// Related posts (in a real app, these would be dynamically generated)
	const relatedPosts = Object.entries(posts)
		.filter(([key]) => key !== slug)
		.map(([key, post]) => ({
			slug: key,
			title: post.title,
			category: post.category,
			image: post.image
		}));

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
		author: post.author?.name
	};
</script>

<SEO {metadata} />
{#if post}
	<!-- Post Header -->
	<div class="relative h-[40vh] w-full">
		<img
			src={post.featuredImage || '/placeholder.svg'}
			alt={post.title}
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div class="px-4 text-center text-white">
				<div class="badge badge-primary mb-4">{post.categories}</div>
				<h1 class="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
				<div class="flex items-center justify-center gap-2">
					<img
						src={post.featuredImage || '/placeholder.svg'}
						alt={post.author?.name}
						class="h-10 w-10 rounded-full"
					/>
					<span>{post.author}</span>
					<span class="mx-2">•</span>
					<span>{formatDate(post.createdAt)}</span>
				</div>
			</div>
		</div>
	</div>

	<main class="container mx-auto px-4 py-10">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="lg:col-span-2">
				<article class="prose prose-lg max-w-none">
					{@html post.content}
				</article>

				<!-- Author Bio -->
				<div
					class="mt-12 flex flex-col items-center gap-6 rounded-lg bg-base-200 p-6 sm:flex-row sm:items-start"
				>
					<img
						src={post.featuredImage || '/placeholder.svg'}
						alt={post.author?.name}
						class="h-24 w-24 rounded-full"
					/>
					<div>
						<h3 class="mb-2 text-xl font-bold">About {post.author}</h3>
						<p class="mb-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
							hendrerit arcu sed erat molestie vehicula.
						</p>
						<div class="flex gap-2">
							<a href="/df" target="_blank" class="btn btn-outline btn-sm">Twitter</a>
							<a href="/dfjd" target="_blank" class="btn btn-outline btn-sm">GitHub</a>
							<a href="/kjdf" target="_blank" class="btn btn-outline btn-sm">Website</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:col-span-1">
				<!-- Related Posts -->
				<div class="mb-8 rounded-box bg-base-100 p-6 shadow-xl">
					<h3 class="mb-6 text-2xl font-bold">Related Posts</h3>
					<div class="space-y-6">
						{#each relatedPosts as relatedPost}
							<div class="flex gap-4">
								<img
									src={relatedPost.image || '/placeholder.svg'}
									alt={relatedPost.title}
									class="h-20 w-20 rounded-md object-cover"
								/>
								<div>
									<div class="badge badge-sm mb-1">{relatedPost.category}</div>
									<h4 class="font-bold hover:text-primary">
										<a href={`/${relatedPost.slug}`}>{relatedPost.title}</a>
									</h4>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Categories -->
				<div class="rounded-box bg-base-100 p-6 shadow-xl">
					<h3 class="mb-6 text-2xl font-bold">Categories</h3>
					<div class="flex flex-wrap gap-2">
						<a href="/development" class="badge badge-primary badge-lg">Development</a>
						<a href="/design" class="badge badge-secondary badge-lg">Design</a>
						<a href="/performance" class="badge badge-accent badge-lg">Performance</a>
						<a href="/devops" class="badge badge-info badge-lg">DevOps</a>
						<a href="/career" class="badge badge-success badge-lg">Career</a>
					</div>
				</div>
			</div>
		</div>
	</main>
{:else}
	<div class="container mx-auto px-4 py-20 text-center">
		<h1 class="mb-4 text-4xl font-bold">Post Not Found</h1>
		<p class="mb-8">The post you're looking for doesn't exist or has been removed.</p>
		<a href="/" class="btn btn-primary">Back to Home</a>
	</div>
{/if}
