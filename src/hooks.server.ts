import { auth } from '$lib/firebase';

export const handle = async ({ event, resolve }) => {
	// Get the current user from Firebase Auth
	const user = await auth.currentUser;

	// Add the user to the locals object for global access
	event.locals.user = user;

	return resolve(event);
};
