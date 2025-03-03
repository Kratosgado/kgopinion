import { auth } from '$lib/firebase';
import type { Post } from '$lib/types';

// Form state
export const post: Post = $state({
  title: 'Untitled Blog',
  content: 'What is on your mind.',
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
