import { getPostBySlug } from '$lib/backend/post.query.js';

export const load = async ({ params }) => {
	try {
		const post = await getPostBySlug(params.slug);
		return { post };
	} catch (err) {
		console.error(err);
		return {};
	}
};
