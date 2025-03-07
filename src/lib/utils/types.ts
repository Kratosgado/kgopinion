
export type Author = {
  id: string;
  name: string;
  email: string;
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
}
