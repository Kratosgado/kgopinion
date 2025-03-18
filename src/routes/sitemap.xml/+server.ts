// src/routes/sitemap.xml/+server.ts
import { PUBLIC_SITE_URL } from '$env/static/public';
import { type Post, formatDate, getAllPosts } from '$lib';

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// Helper function to properly encode URLs for XML
function formatUrl(url: string): string {
	try {
		// First encode the URL properly
		const encodedUrl = encodeURI(url);
		// Then escape any XML special characters
		return escapeXml(encodedUrl);
	} catch (error) {
		console.error('Error formatting URL:', url, error);
		return '';
	}
}

export async function GET() {
	const posts: Post[] = await getAllPosts();

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    <url>
        <loc>${formatUrl(PUBLIC_SITE_URL)}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    ${posts
			.map(
				(post) => `    <url>
        <loc>${formatUrl(`${PUBLIC_SITE_URL}/articles/${post.slug}`)}</loc>
        <lastmod>${formatDate(post.updatedAt)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>${
					post.featuredImage
						? `
        <image:image>
            <image:loc>${formatUrl(post.featuredImage)}</image:loc>
            <image:title>${escapeXml(post.title)}</image:title>
        </image:image>`
						: ''
				}
    </url>`
			)
			.join('\n')}
</urlset>`.trim();

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			// Add cache control headers if needed
			'Cache-Control': 'max-age=3600'
		}
	});
}
