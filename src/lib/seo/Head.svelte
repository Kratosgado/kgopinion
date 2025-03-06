<script lang="ts">
	import { page } from '$app/state';
	import type { SEOMetadata } from '.';

	export let metadata: SEOMetadata;

	const defaultMetadata: SEOMetadata = {
		type: 'website',
		canonicalUrl: page.url.href,
		title: '',
		description: '',
		keywords: []
	};

	const seoData = { ...defaultMetadata, ...metadata };
</script>

<svelte:head>
	<!-- Basic SEO -->
	<title>{seoData.title} | Kgopinion</title>
	<meta name="description" content={seoData.description} />
	<meta name="keywords" content={seoData.keywords.join(', ')} />
	<meta name="google-site-verification" content="Om30v--Ewy1b-EScX40h9uDEpVM1BLgp-vjxhM8K-aM" />
	<!-- Canonical URL -->
	<link rel="canonical" href={seoData.canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seoData.type} />
	<meta property="og:title" content={seoData.title} />
	<meta property="og:description" content={seoData.description} />
	<meta property="og:url" content={seoData.canonicalUrl} />
	{#if seoData.ogImage}
		<meta property="og:image" content={seoData.ogImage} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoData.title} />
	<meta name="twitter:description" content={seoData.description} />
	{#if seoData.ogImage}
		<meta name="twitter:image" content={seoData.ogImage} />
	{/if}

	<!-- Article Specific -->
	{#if seoData.type === 'article'}
		<meta property="article:published_time" content={seoData.publishedTime} />
		<meta property="article:modified_time" content={seoData.modifiedTime} />
		<meta property="article:author" content={seoData.author} />
	{/if}

	<!-- Structured Data -->
	{@html `
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "${seoData.type === 'article' ? 'BlogPosting' : 'WebSite'}",
            "headline": "${seoData.title}",
            "description": "${seoData.description}",
            ${
							seoData.type === 'article'
								? `
                "datePublished": "${seoData.publishedTime}",
                "dateModified": "${seoData.modifiedTime}",
                "author": {
                    "@type": "Person",
                    "name": "${seoData.author}"
                },
            `
								: ''
						}
            "url": "${seoData.canonicalUrl}"
        }
        </script>
    `}
</svelte:head>
