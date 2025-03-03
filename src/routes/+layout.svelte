<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	// Import the children prop to render the page content
	let { children } = $props();
</script>

<svelte:head>
	<title>Blog Landing Page</title>
	<link
		href="https://cdn.jsdelivr.net/npm/daisyui@3.5.0/dist/full.css"
		rel="stylesheet"
		type="text/css"
	/>
	<link
		href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css"
		rel="stylesheet"
		type="text/css"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<NavBar />
	{@render children()}
	<Footer />
</div>
