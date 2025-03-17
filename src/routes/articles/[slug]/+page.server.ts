import { getPostBySlug } from '$lib/backend/post.query.js';

export const load = async ({ params }) => {
	const post = await getPostBySlug(params.slug);
	return { post };
};
