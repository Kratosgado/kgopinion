import type { Timestamp } from 'firebase/firestore';

export interface SEO {
	title: string;
	description: string;
	keywords: string[];
}

export interface Post {
	id?: string;
	title: string;
	content: string;
	slug: string;
	published: boolean;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	author: string;
	categories: string[];
	featuredImage: string;
	excerpt: string;
	seo: SEO;
}
