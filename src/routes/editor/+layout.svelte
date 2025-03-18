<script>

	import { ProtectedRoute } from "$lib";

	let { children } = $props();
</script>

<ProtectedRoute {children} />
