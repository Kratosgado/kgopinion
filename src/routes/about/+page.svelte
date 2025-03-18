<script lang="ts">
	import { Loading } from '$lib';
	import type { SEOMetadata } from '$lib/seo';
	import SEO from '$lib/seo/Head.svelte';

	const metadata: SEOMetadata = {
		title: 'About - KgOpinion',
		description:
			'Learn more about KgOpinion and its mission to provide high-quality content on web development, design, and technology.',
		keywords: ['about', 'mission', 'team', 'community', 'contact'],
		type: 'website',
		ogImage: '/static/favicon.png'
	};
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

	let teamMembers: Author[] = [];
	let loading = true;

	onMount(async () => {
		// In a real app, you would fetch team members from your API
		teamMembers = [
			{
				id: 'author1',
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
			},
			{
				id: 'author2',
				name: 'John Smith',
				email: 'john@example.com',
				bio: 'Full-stack developer specializing in React and Node.js. Loves to share knowledge through writing and speaking.',
				avatar: 'https://i.pravatar.cc/300?u=john',
				role: 'Content Manager',
				social: {
					twitter: 'johnsmith',
					github: 'johnsmith',
					linkedIn: 'john-smith'
				}
			},
			{
				id: 'author3',
				name: 'Alex Johnson',
				email: 'alex@example.com',
				bio: 'Performance optimization expert with a background in systems engineering. Focused on making the web faster for everyone.',
				avatar: 'https://i.pravatar.cc/300?u=alex',
				role: 'Technical Editor',
				social: {
					twitter: 'alexjohnson',
					github: 'alexjohnson',
					linkedIn: 'alex-johnson'
				}
			}
		];

		loading = false;
	});
</script>

<SEO {metadata} />

<div class="container mx-auto py-12 px-4">
	<h1 class="text-4xl font-bold mb-8">About KgOpinion</h1>

	<div class="prose lg:prose-xl max-w-none mb-16">
		<p>
			Welcome to KgOpinion, a platform dedicated to sharing knowledge and insights about web
			development, design, and technology.
		</p>

		<h2>Our Mission</h2>
		<p>
			At KgOpinion, we strive to provide high-quality, informative content that helps developers and
			designers stay up-to-date with the latest trends and best practices in the industry.
		</p>

		<p>
			Our articles are written by experienced professionals who are passionate about their craft and
			committed to sharing their knowledge with the community.
		</p>

		<h2>What We Cover</h2>
		<p>Our content spans a wide range of topics, including:</p>

		<ul>
			<li>
				<strong>Web Development</strong> - Frontend and backend technologies, frameworks, and best practices
			</li>
			<li><strong>Design</strong> - UI/UX principles, design systems, and creative processes</li>
			<li><strong>Performance</strong> - Optimization techniques, metrics, and tools</li>
			<li><strong>DevOps</strong> - Deployment strategies, CI/CD, and infrastructure management</li>
			<li>
				<strong>Career Development</strong> - Professional growth, skill acquisition, and industry insights
			</li>
		</ul>

		<h2>Join Our Community</h2>
		<p>
			We encourage our readers to engage with our content, share their thoughts, and contribute to
			discussions. Together, we can create a vibrant community of learners and innovators.
		</p>
	</div>

	<h2 class="text-3xl font-bold mb-8">Meet Our Team</h2>

	{#if loading}
		<Loading />
	{:else}
		<!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> -->
		<!--   {#each teamMembers as member} -->
		<!--     <div class="card bg-base-100 shadow-xl"> -->
		<!--       <figure class="px-10 pt-10"> -->
		<!--         <img src={member.avatar || "/placeholder.svg"} alt={member.name} class="rounded-xl w-32 h-32 object-cover" /> -->
		<!--       </figure> -->
		<!--       <div class="card-body items-center text-center"> -->
		<!--         <h2 class="card-title text-xl">{member.name}</h2> -->
		<!--         <div class="badge badge-primary">{member.role}</div> -->
		<!--         <p class="mt-2">{member.bio}</p> -->
		<!--         <div class="card-actions justify-center mt-4"> -->
		<!--           {#if member.social?.twitter} -->
		<!--             <a href={`https://twitter.com/${member.social.twitter}`} target="_blank" rel="noopener noreferrer" class="btn btn-circle btn-outline"> -->
		<!--               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg> -->
		<!--             </a> -->
		<!--           {/if} -->
		<!--           {#if member.social?.github} -->
		<!--             <a href={`https://github.com/${member.social.github}`} target="_blank" rel="noopener noreferrer" class="btn btn-circle btn-outline"> -->
		<!--               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> -->
		<!--             </a> -->
		<!--           {/if} -->
		<!--           {#if member.social?.linkedIn} -->
		<!--             <a href={`https://linkedin.com/in/${member.social.linkedIn}`} target="_blank" rel="noopener noreferrer" class="btn btn-circle btn-outline"> -->
		<!--               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> -->
		<!--             </a> -->
		<!--           {/if} -->
		<!--         </div> -->
		<!--       </div> -->
		<!--     </div> -->
		<!-- {/each} -->
		<!-- </div> -->
	{/if}
</div>
