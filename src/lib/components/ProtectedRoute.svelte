<script lang="ts">
  import { auth, type AuthState } from '$lib/backend';
  import { redirect } from '@sveltejs/kit';
  import { onDestroy, onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/motion';
  import Loading from './Loading.svelte';
  
	let { children } = $props();
  // State
  let state: AuthState | null = $state(null);
  let unsubscribe: Unsubscriber;
  
  onMount(async () => {
      unsubscribe = auth.subscribe(v => {
    state = v;
   })
      if (!state?.isAuthenticated) {
       // Redirect to login page with return URL
        const returnUrl = encodeURIComponent(window.location.pathname);
        redirect(301, '/auth')
      }
    
  onDestroy(unsubscribe)
  });
</script>

{#if state?.isLoading}
  <Loading />
{:else if state?.isAuthenticated}
  {@render children()}
{/if}
