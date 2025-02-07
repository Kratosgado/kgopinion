import { getPost } from '$lib/utils';

export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	console.log(post)
	return { post };
};
