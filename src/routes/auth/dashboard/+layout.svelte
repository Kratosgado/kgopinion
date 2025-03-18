<script lang="ts">
	import { ProtectedRoute } from '$lib';
  let {children } = $props()
</script>

<ProtectedRoute {children} />
