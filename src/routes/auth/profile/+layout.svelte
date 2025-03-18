<script lang='ts'>
	import type { AuthState } from "$lib";
	import { ProtectedRoute } from "$lib";
  
	let { children }: {children: (state: AuthState) => any} = $props();

</script>

<ProtectedRoute {children}/>
