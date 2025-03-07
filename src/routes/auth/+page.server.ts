// src/routes/auth/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { auth } from '$lib';

export const load = async ({ locals }) => {
	// Check if the user is already authenticated
	const user = locals.user; // Assuming you store the user in locals during middleware

	if (user) {
		throw redirect(302, '/'); // Redirect to homepage if already logged in
	}

	return {};
};
