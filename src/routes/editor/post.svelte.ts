import { type Post } from '$lib';

// Form state
export const post: Post = $state({
	title: 'Untitled Blog',
	content: '',
	slug: '',
	published: false,
	author: 'Kratosgado',
	categories: [],
	keywords: [],
	featuredImage: undefined,
	excerpt: '',
	createdAt: new Date(),
	updatedAt: new Date()
});
