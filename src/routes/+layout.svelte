<script>
  import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	// Import the children prop to render the page content
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />
	{@render children()}
	<Footer />
</div>
