import { getRecentPosts } from '$lib/backend/post.query';

export const load = async () => {
	try {
		const { posts, lastVisible } = await getRecentPosts(6, null, true);
		return { posts };
	} catch (err) {
		console.log(err);
		return {};
	}
};
