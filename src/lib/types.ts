import type { Timestamp } from 'firebase/firestore';

export interface SEO {
	title: string;
	description: string;
	keywords: string[];
}

export type Author = {
	id: string;
	name: string;
	email: string;
};

export type Post = {
	title: string;
	content: string;
	slug: string;
	published: boolean;
	createdAt: Date;
	updatedAt: Date;
	author: string;
	categories: string[];
	tags: string[];
	featuredImage: string;
	excerpt: string;
	seo: SEO;
}
