import { getAllCategories } from '$lib/backend/comment.query';

export const load = async () => {
	try {
		const categories = await getAllCategories();
		return { categories };
	} catch (err) {
		console.log(err);
		return {};
	}
};
