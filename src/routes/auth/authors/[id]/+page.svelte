<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	interface Author {
		id: string;
		name: string;
		email: string;
		bio?: string;
		avatar: string;
		social?: {
			twitter?: string;
			github?: string;
			linkedIn?: string;
		};
		role: string;
	}

	interface Post {
		title: string;
		content: string;
		slug: string;
		excerpt: string;
		publishedAt?: Date;
		published: boolean;
		createdAt: Date;
		updatedAt: Date;
		authorId: string;
		author?: Author;
		categories: string[];
		keywords: string[];
		featuredImage?: string;
		readTime?: number;
		likeCount: number;
		commentCount: number;
	}

	// State
	let author: Author | null = null;
	let posts: Post[] = [];
	let isLoading = true;
	let error = '';

	// Get author ID from URL
	$: authorId = $page.params.id;

	onMount(async () => {
		try {
			// In a real app, you would fetch the author and their posts from your API
			// For example:
			// const authorData = await fetchAuthor(authorId);
			// const authorPosts = await fetchAuthorPosts(authorId);

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Sample author data
			author = {
				id: authorId,
				name: 'Jane Doe',
				email: 'jane@example.com',
				bio: 'Frontend developer with 5 years of experience. Passionate about creating beautiful and accessible user interfaces.',
				avatar: 'https://i.pravatar.cc/300?u=jane',
				role: 'Lead Developer',
				social: {
					twitter: 'janedoe',
					github: 'janedoe',
					linkedIn: 'jane-doe'
				}
			};

			// Sample posts data
			posts = [
				{
					title: 'Getting Started with Svelte',
					slug: 'getting-started-with-svelte',
					excerpt: 'Learn how to build reactive web applications with Svelte framework.',
					featuredImage: 'https://picsum.photos/seed/svelte/800/600',
					categories: ['Development', 'Frontend'],
					keywords: ['svelte', 'javascript', 'frontend'],
					createdAt: new Date('2023-05-15'),
					updatedAt: new Date('2023-05-15'),
					publishedAt: new Date('2023-05-15'),
					published: true,
					authorId: authorId,
					likeCount: 42,
					commentCount: 7,
					readTime: 5,
					content: ''
				},
				{
					title: 'The Power of DaisyUI',
					slug: 'the-power-of-daisyui',
					excerpt: 'Discover how DaisyUI can streamline your Tailwind CSS workflow.',
					featuredImage: 'https://picsum.photos/seed/daisyui/800/600',
					categories: ['Design', 'Frontend'],
					keywords: ['daisyui', 'tailwind', 'css'],
					createdAt: new Date('2023-06-02'),
					updatedAt: new Date('2023-06-02'),
					publishedAt: new Date('2023-06-02'),
					published: true,
					authorId: authorId,
					likeCount: 28,
					commentCount: 4,
					readTime: 4,
					content: ''
				},
				{
					title: 'Building a Blog with SvelteKit',
					slug: 'building-a-blog-with-sveltekit',
					excerpt: 'A comprehensive guide to creating a blog using SvelteKit and Firebase.',
					featuredImage: 'https://picsum.photos/seed/blog/800/600',
					categories: ['Development', 'Tutorial'],
					keywords: ['sveltekit', 'blog', 'firebase'],
					createdAt: new Date('2023-08-05'),
					updatedAt: new Date('2023-08-05'),
					publishedAt: new Date('2023-08-05'),
					published: true,
					authorId: authorId,
					likeCount: 15,
					commentCount: 2,
					readTime: 12,
					content: ''
				}
			];
		} catch (err) {
			console.error(err);
			error = 'Failed to load author profile. Please try again.';
		} finally {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	{#if author}
		<title>{author.name} - KgOpinion</title>
		<meta name="description" content={author.bio || `Articles by ${author.name}`} />
	{:else}
		<title>Author Profile - KgOpinion</title>
	{/if}
</svelte:head>

<div class="container mx-auto py-12 px-4">
	{#if isLoading}
		<div class="flex justify-center items-center py-12">
			<div class="loading loading-spinner loading-lg"></div>
		</div>
	{:else if error}
		<div class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{error}</span>
		</div>
	{:else if author}
		<!-- Author Header -->
		<div class="card bg-base-100 shadow-xl mb-12">
			<div class="card-body">
				<div class="flex flex-col md:flex-row gap-8 items-center md:items-start">
					<div class="avatar">
						<div class="w-32 h-32 rounded-full">
							<img src={author.avatar || '/placeholder.svg'} alt={author.name} />
						</div>
					</div>

					<div class="flex-1 text-center md:text-left">
						<h1 class="text-3xl font-bold mb-2">{author.name}</h1>
						<div class="badge badge-primary mb-4">{author.role}</div>

						{#if author.bio}
							<p class="mb-4 max-w-2xl">{author.bio}</p>
						{/if}

						{#if author.social}
							<div class="flex flex-wrap gap-3 justify-center md:justify-start">
								{#if author.social.twitter}
									<a
										href={`https://twitter.com/${author.social.twitter}`}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-outline btn-sm gap-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
											></path></svg
										>
										Twitter
									</a>
								{/if}

								{#if author.social.github}
									<a
										href={`https://github.com/${author.social.github}`}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-outline btn-sm gap-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
											></path></svg
										>
										GitHub
									</a>
								{/if}

								{#if author.social.linkedIn}
									<a
										href={`https://linkedin.com/in/${author.social.linkedIn}`}
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-outline btn-sm gap-2"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
											></path><rect x="2" y="9" width="4" height="12"></rect><circle
												cx="4"
												cy="4"
												r="2"
											></circle></svg
										>
										LinkedIn
									</a>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Author Posts -->
		<h2 class="text-2xl font-bold mb-6">Articles by {author.name}</h2>

		{#if posts.length === 0}
			<div class="alert">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-info shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path></svg
				>
				<span>This author hasn't published any articles yet.</span>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each posts as post}
					<div class="card bg-base-100 shadow-xl">
						<figure>
							<img
								src={post.featuredImage || '/placeholder.svg'}
								alt={post.title}
								class="h-48 w-full object-cover"
							/>
						</figure>
						<div class="card-body">
							<h3 class="card-title">
								{post.title}
							</h3>
							<div class="flex flex-wrap gap-1 mb-2">
								{#each post.categories as category}
									<div class="badge badge-outline">{category}</div>
								{/each}
							</div>
							<p>{post.excerpt}</p>

							<div class="flex justify-between items-center mt-4">
								<div class="flex items-center gap-2 text-sm">
									<span class="flex items-center gap-1" title="Published Date">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line
												x1="16"
												y1="2"
												x2="16"
												y2="6"
											></line><line x1="8" y1="2" x2="8" y2="6"></line><line
												x1="3"
												y1="10"
												x2="21"
												y2="10"
											></line></svg
										>
										{post.publishedAt?.toLocaleDateString()}
									</span>
									<span class="flex items-center gap-1" title="Read Time">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"
											></polyline></svg
										>
										{post.readTime} min
									</span>
								</div>
								<div class="flex items-center gap-2">
									<span class="flex items-center gap-1" title="Likes">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
											></path></svg
										>
										{post.likeCount}
									</span>
									<span class="flex items-center gap-1" title="Comments">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											><path
												d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
											></path></svg
										>
										{post.commentCount}
									</span>
								</div>
							</div>

							<div class="card-actions justify-end mt-4">
								<a href={`/${post.slug}`} class="btn btn-primary btn-sm">Read Article</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{:else}
		<div class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>Author not found</span>
		</div>
	{/if}
</div>
