import { type Post } from '$lib';

// Form state
export const post: Post = $state({
	title: 'Untitled Blog',
	content: '',
	slug: '',
	published: false,
	categories: [],
	keywords: [],
	authorId: '',
	commentCount: 0,
	likeCount: 0,
	featuredImage: undefined,
	excerpt: '',
	createdAt: new Date(),
	updatedAt: new Date()
});
