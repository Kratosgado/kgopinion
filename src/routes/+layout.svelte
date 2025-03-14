<script>
	import { NavBar, Footer } from '$lib';
  import '../app.css';

	// Import the children prop to render the page content
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />
	{@render children()}
	<Footer />
</div>
