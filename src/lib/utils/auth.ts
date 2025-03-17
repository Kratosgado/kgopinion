// src/lib/auth.ts
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import { getAuthor, type Author } from '$lib';

export function subscribeToAuthState(callback: (user: Author | undefined) => void) {
	return onAuthStateChanged(firebaseAuth, async (u) => {
		const user = u ? await getAuthor(u!.uid) : undefined;
		callback(user);
	});
}
