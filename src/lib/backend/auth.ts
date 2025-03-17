import { goto } from '$app/navigation';
import { firebaseAuth } from '$lib/utils';
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	type User
} from 'firebase/auth';
import { writable } from 'svelte/store';

export type AuthState = {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
};

// Initial state
const initialState: AuthState = {
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
		initialize: async () => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				// In a real app, you would check if the user is authenticated
				// For example:
				const user = firebaseAuth.currentUser;

				if (user) {
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

				update((state) => ({
					...state,
					user,
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
				update((state) => ({
					...state,
					user,
					isAuthenticated: true,
					isLoading: false
				}));

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
		updateProfile: async (userData: Partial<User>) => {
			update((state) => ({ ...state, isLoading: true, error: null }));

			try {
				// await updateUserProfile(userData);

				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1000));

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
	auth.initialize();
}
