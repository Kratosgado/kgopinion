import type { PageServerLoad } from './$types';
import { getPostBySlug } from '$lib';
import { post } from './post.svelte';

export const load: PageServerLoad = async ({ params }) => {
	try {
		if (params.slug === 'new') {
			return { edit: post };
		}
		const edit = await getPostBySlug(params.slug);
		return { edit };
	} catch (err) {
		console.error(err);
		return { edit: post };
	}
};
