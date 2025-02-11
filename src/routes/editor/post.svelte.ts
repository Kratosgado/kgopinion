import { auth } from '$lib/firebase';
import type { Post } from '$lib/types';

// Form state
export const post: Post = $state({
	title: 'Untitled Blog',
	content: 'What is on your ming.',
	slug: '',
	published: false,
	author: auth.currentUser?.uid || '',
	categories: [],
  tags: [],
	featuredImage: undefined,
	excerpt: '',
	seo: {
		title: '',
		description: '',
		keywords: []
	},
	createdAt: new Date(),
	updatedAt: new Date()
});
