<script lang="ts">
	import { ProtectedRoute } from '$lib';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ProtectedRoute {children} />
