import { Query, type Post } from '$lib';

export const load = async () => {
	try {
		const posts = await new Query<Post>('posts')
			.orderBy('createdAt', 'desc')
			.limit(6)
			.get<Post[]>();

		return { posts };
	} catch (err) {
		console.log(err);
		return {};
	}
};
