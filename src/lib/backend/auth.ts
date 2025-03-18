import { firebaseAuth, subscribeToAuthState, toAuthState, type Author } from '$lib/utils';
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	type User
} from 'firebase/auth';
import { writable } from 'svelte/store';
import { addAuthor, getAuthor, updateAuthor } from './user.query';

export type AuthState = {
	user: Author | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
};

// Initial state
export const initialState: AuthState = {
	user: null,
	isAuthenticated: false,
	isLoading: true,
	error: null
};

// Create the store
const createAuthStore = () => {
	const { subscribe, set, update } = writable<AuthState>(initialState);

	return {
		subscribe,

		// Initialize auth state
		initialize: async (u: User | null) => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				if (u) {
					if (!(await getAuthor(u.uid))) {
						console.log('addin author');
						await addAuthor(u);
					}
					const user = (await getAuthor(u.uid)) || null;

					update((state) => ({
						...state,
						user,
						isAuthenticated: true,
						isLoading: false
					}));
				} else {
					update((state) => ({
						...state,
						user: null,
						isAuthenticated: false,
						isLoading: false
					}));
				}
			} catch (err) {
				console.error('Auth initialization failed:', err);
				update((state) => ({
					...state,
					user: null,
					isAuthenticated: false,
					isLoading: false,
					error: 'Failed to authenticate'
				}));
			}
		},

		// Sign in with email and password
		signIn: async (email: string, password: string) => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
				if (!(await getAuthor(user.uid))) {
					console.log('addin author');
					await addAuthor(user);
				}
				const us = (await getAuthor(user.uid)) || null;

				update((state) => ({
					...state,
					user: us,
					isAuthenticated: true,
					isLoading: false
				}));

				return true;
			} catch (err) {
				console.error('Sign in failed:', err);
				update((state) => ({
					...state,
					isLoading: false,
					error: 'Invalid email or password'
				}));
				return false;
			}
		},

		signInWithGoogle: async () => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				const { user } = await signInWithPopup(firebaseAuth, new GoogleAuthProvider());
				// update((state) => ({
				// 	...state,
				// 	user,
				// 	isAuthenticated: true,
				// 	isLoading: false
				// }));

				return true;
			} catch (err) {
				console.error('Google sign in failed:', err);
				update((state) => ({
					...state,
					isLoading: false,
					error: 'Failed to sign in with Google'
				}));

				return false;
			}
		},

		// Sign out
		signOut: async () => {
			update((state) => ({ ...state, isLoading: true }));

			try {
				await firebaseAuth.signOut();

				update((state) => ({
					...state,
					user: null,
					isAuthenticated: false,
					isLoading: false
				}));

				return true;
			} catch (err) {
				console.error('Sign out failed:', err);
				update((state) => ({
					...state,
					isLoading: false,
					error: 'Failed to sign out'
				}));

				return false;
			}
		},

		// Update user profile
		updateProfile: async (userData: Partial<Author>) => {
			update((state) => ({ ...state, error: null }));

			try {
				await updateAuthor(userData);

				update((state) => ({
					...state,
					user: state.user ? { ...state.user, ...userData } : null,
					isLoading: false
				}));

				return true;
			} catch (err) {
				console.error('Profile update failed:', err);
				update((state) => ({
					...state,
					isLoading: false,
					error: 'Failed to update profile'
				}));

				return false;
			}
		},

		// Reset error
		clearError: () => {
			update((state) => ({ ...state, error: null }));
		}
	};
};

// Export the store
export const auth = createAuthStore();

// Initialize auth state when the app loads
if (typeof window !== 'undefined') {
	toAuthState(async (u) => {
		await auth.initialize(u);
	});
}
