<script lang="ts">
	import { auth, initialState, type AuthState } from '$lib/backend';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';
	import Loading from './Loading.svelte';
	import { goto } from '$app/navigation';

	let { children }: { children: Snippet } = $props();
	// State
	let authState: AuthState = $state(initialState);
	let unsubscribe: Unsubscriber;

	onMount(async () => {
		unsubscribe = auth.subscribe((v) => {
			authState = v;
			if (!authState.isLoading && !authState.isAuthenticated) {
				const returnUrl = encodeURIComponent(window.location.pathname);
				goto(`/auth?returnUrl=${returnUrl}`);
			}
		});

		       onDestroy(() => unsubscribe && unsubscribe());
	});
</script>

{#if authState?.isLoading}
	<Loading />
{:else if authState.isAuthenticated}
	{@render children()}
{/if}
