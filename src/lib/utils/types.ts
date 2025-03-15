export type Author = {
	id: string;
	name: string;
	email: string;
};

export type ImageType = {
	id: string;
	src: string;
	alt: string;
	thumbnail: string;
	fileName: string;
	storagePath: string;
};

export type Post = {
	title: string;
	content: string;
	slug: string;
	publishedAt?: Date;
	published: boolean;
	createdAt: Date;
	updatedAt: Date;
	author: string;
	categories: string[];
	keywords: string[];
	featuredImage?: string;
	excerpt: string;
};
