<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onDestroy } from 'svelte';
	import { subscribeToAuthState } from '$lib/auth';

	let user: any = null;

	const unsubscribe = subscribeToAuthState((u) => {
		user = u;
	});

	onDestroy(() => unsubscribe());
	import { goto } from '$app/navigation';
</script>

<NavBar />

<main class="container mx-auto py-8">
	<slot />
</main>

<footer class="mt-8 bg-gray-800 p-4 text-white">
	<div class="container mx-auto text-center">
		<p>&copy; 2025 kgopinion. All rights reserved.</p>
	</div>
</footer>
