<!-- src/routes/auth/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';
	import {
		signInWithEmailAndPassword,
		GoogleAuthProvider,
		signInWithPopup,
		signInAnonymously
	} from 'firebase/auth';

	let email = '';
	let password = '';

	// Sign in with Google
	async function signInWithGoogle() {
		try {
			await signInWithPopup(auth, new GoogleAuthProvider());
			goto('/'); // Redirect to homepage after successful login
		} catch (error) {
			alert(`Error signing in with Google: ${error.message}`);
		}
	}

	// Sign in with email and password
	async function signInWithEmail() {
		if (!email || !password) {
			alert('Please enter both email and password.');
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto('/');
		} catch (error) {
			alert(`Error signing in with email: ${error.message}`);
		}
	}

	// Sign in anonymously
	async function signInAnon() {
		try {
			await signInAnonymously(auth);
			goto('/');
		} catch (error) {
			alert(`Error signing in anonymously: ${error.message}`);
		}
	}
</script>

<section class="auth flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-96 rounded-md bg-white p-8 shadow-md">
		<h2 class="mb-6 text-center text-2xl font-bold">Sign In</h2>

		<!-- Google Sign-In Button -->
		<button
			on:click={signInWithGoogle}
			class="mb-4 w-full rounded-md bg-red-500 py-2 text-white hover:bg-red-600"
		>
			Sign In with Google
		</button>

		<!-- Email and Password Sign-In -->
		<div class="mb-4">
			<input
				type="email"
				bind:value={email}
				placeholder="Email"
				class="mb-2 w-full rounded-md border px-3 py-2"
			/>
			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				class="w-full rounded-md border px-3 py-2"
			/>
		</div>
		<button
			on:click={signInWithEmail}
			class="mb-4 w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
		>
			Sign In with Email
		</button>

		<!-- Anonymous Sign-In -->
		<button
			on:click={signInAnon}
			class="w-full rounded-md bg-gray-500 py-2 text-white hover:bg-gray-600"
		>
			Sign In Anonymously
		</button>
	</div>
</section>
