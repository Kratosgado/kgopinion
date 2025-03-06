<script lang="ts">
	import type { SEOMetadata } from '$lib/seo';
	import SEO from '$lib/seo/Head.svelte';

  const metadata: SEOMetadata = {
    title: 'About - KgOpinion',
    description: 'Learn more about KgOpinion and its mission to provide high-quality content on web development, design, and technology.',
    keywords: ['about', 'mission', 'team', 'community', 'contact'],
    type: 'website',
    ogImage: '/static/favicon.png',
   }
  
</script>

<SEO {metadata} />

<div class="container mx-auto py-12 px-4">
  <h1 class="text-4xl font-bold mb-8">About KgOpinion</h1>
  
  <div class="prose lg:prose-xl">
    <p>Welcome to KgOpinion, a platform dedicated to sharing knowledge and insights about web development, design, and technology.</p>
    
    <h2>Our Mission</h2>
    <p>At KgOpinion, we strive to provide high-quality, informative content that helps developers and designers stay up-to-date with the latest trends and best practices in the industry.</p>
    
    <h2>Our Team</h2>
    <p>We are a group of passionate developers and designers who love to share our knowledge and experiences with the community.</p>
    
    <h2>Join Our Community</h2>
    <p>We encourage our readers to engage with our content, share their thoughts, and contribute to discussions. Together, we can create a vibrant community of learners and innovators.</p>
    
    <h2>Contact Us</h2>
    <p>Have questions or suggestions? We'd love to hear from you! Visit our <a href="/contact" class="text-primary hover:underline">contact page</a> to get in touch.</p>
  </div>
</div>
