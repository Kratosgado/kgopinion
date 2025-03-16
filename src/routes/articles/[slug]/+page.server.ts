import { Query, type Post } from '$lib';

export const load = async ({ params }) => {
	const post = await new Query<Post>('posts')
		.whereEqualTo('slug', params.slug)
		.whereEqualTo('published', 'd')
		.get();
	return { post };
};
