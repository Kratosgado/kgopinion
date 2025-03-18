import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib';
import { post } from './post.svelte';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const edit = await getPostBySlug(params.slug);
		return { edit };
	} catch (err) {
		console.error(err);
		return { post };
	}
};
