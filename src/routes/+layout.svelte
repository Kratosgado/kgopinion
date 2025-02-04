<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { onDestroy } from 'svelte';
	import { subscribeToAuthState } from '$lib/auth';

	let user: any = null;

	const unsubscribe = subscribeToAuthState((u) => {
		user = u;
	});

	onDestroy(() => unsubscribe());
	import { goto } from '$app/navigation';
</script>

<header class="bg-gray-800 p-4 text-white shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/"><h1 class="cursor-pointer text-2xl font-bold">kgopinion</h1></a>
		<nav>
			<ul class="flex space-x-4">
				<li><a href="/posts" class="hover:text-blue-500">Posts</a></li>
				<li><a href="/about" class="hover:text-blue-500">About</a></li>
			</ul>
		</nav>
		{#if user}
			<p>Welcome, {user?.email || 'Anonymous User'}!</p>
		{:else}
			<a href="/auth">Sign In</a>
		{/if}
	</div>
</header>

<main class="container mx-auto py-8">
	<slot />
</main>

<footer class="mt-8 bg-gray-800 p-4 text-white">
	<div class="container mx-auto text-center">
		<p>&copy; 2025 kgopinion. All rights reserved.</p>
	</div>
</footer>
