<script lang="ts">
	import { page } from '$app/state';
	import { type AuthState, Footer, auth, initialState } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';
	import '../app.css';

	let { children } = $props();
	// Check if the current route should show the navbar
	let authState: AuthState = $state(initialState);
	let unsubscribe: Unsubscriber;

	onMount(async () => {
		unsubscribe = auth.subscribe((v) => {
			authState = v;
		});
		onDestroy(() => unsubscribe());
	});
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="w-full navbar bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path></svg
					>
				</label>
			</div>
			<img alt="logo" src="/favicon.png" class="w-10 rounded-full" />
			<div class="flex-1 px-2 mx-2">
				<a href="/" class="text-xl font-bold">KgOpinion</a>
			</div>
			<div class="flex-none hidden lg:block">
				<ul class="menu items-center menu-horizontal">
					<!-- Public navigation -->
					<li><a href="/" class:active={page.url.pathname === '/'}>Home</a></li>
					<li><a href="/articles" class:active={page.url.pathname === '/articles'}>Articles</a></li>
					<li>
						<a
							href="/articles/categories"
							class:active={page.url.pathname === '/articles/categories'}>Categories</a
						>
					</li>
					<li><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
					<li><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>

					<!-- Authenticated navigation -->
					{#if authState?.isAuthenticated && authState.user}
						<li>
							<details>
								<summary>
									<div class="avatar">
										<div class="w-8 h-8 rounded-full">
											<img
												src={authState.user.avatar || '/favicon.png'}
												alt={authState.user.name}
											/>
										</div>
									</div>
								</summary>
								<ul class="p-2 bg-base-100 rounded-t-none">
									<li><a href="/auth/dashboard">Dashboard</a></li>
									<li><a href="/auth/profile">Profile</a></li>
									<!-- <li><a href="/editor">New Post</a></li> -->
									<li><a href="/" onclick={auth.signOut}>Sign Out</a></li>
								</ul>
							</details>
						</li>
					{:else if !authState?.isLoading}
						<li><a href="/auth" class="btn btn-primary">Sign In</a></li>
					{/if}
				</ul>
			</div>
		</div>

		<!-- Page content -->
		{@render children()}

		<Footer />
	</div>

	<!-- Mobile drawer -->
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay"></label>
		<ul class="menu p-4 w-80 h-full bg-base-200">
			<!-- Mobile navigation -->
			<li aria-label="home"><a href="/" class:active={page.url.pathname === '/'}>Home</a></li>
			<li aria-label="articles"><a href="/articles" class:active={page.url.pathname === '/articles'}>Articles</a></li>
			<li aria-label="categories">
				<a href="/articles/categories" class:active={page.url.pathname === '/articles/categories'}
					>Categories</a
				>
			</li>
			<li aria-label="about"><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
			<li aria-label="contact"><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>

			<!-- Divider -->
			<div class="divider"></div>

			<!-- Authenticated navigation for mobile -->
			{#if authState?.isAuthenticated && authState?.user}
				<li class="menu-title">
					<div class="flex items-center gap-2">
						<div class="avatar">
							<div class="w-8 h-8 rounded-full">
								<img src={authState.user.avatar || '/favicon.svg'} alt={authState.user.name} />
							</div>
						</div>
						<span>{authState.user.name}</span>
					</div>
				</li>
				<li><a href="/auth/dashboard">Dashboard</a></li>
				<li><a href="/auth/profile">Profile</a></li>
				<li><a href="/editor">New Post</a></li>
				<li><a href="/" onclick={auth.signOut}>Sign Out</a></li>
			{:else if !authState?.isLoading}
				<li><a href="/auth" class="btn btn-primary justify-start">Sign In</a></li>
			{/if}
		</ul>
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
	}

	:global(#app) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
