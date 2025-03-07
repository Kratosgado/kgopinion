import { type Post, auth } from '$lib';

// Form state
export const post: Post = $state({
	title: 'Untitled Blog',
	content: '',
	slug: '',
	published: false,
	author: auth.currentUser?.uid || '',
	categories: [],
	keywords: [],
	featuredImage: undefined,
	excerpt: '',
	createdAt: new Date(),
	updatedAt: new Date()
});
