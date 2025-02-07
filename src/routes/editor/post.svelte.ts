import { auth } from '$lib/firebase';
import type { Post } from '$lib/types';
import { Timestamp } from 'firebase/firestore';

// Form state
export const post: Post = $state({
	title: 'Untitled Blog',
	content: 'What is on your ming.',
	slug: '',
	published: false,
	author: auth.currentUser?.uid || '',
	categories: [],
	featuredImage: '',
	excerpt: '',
	seo: {
		title: '',
		description: '',
		keywords: []
	},
	createdAt: Timestamp.now(),
	updatedAt: Timestamp.now()
});
