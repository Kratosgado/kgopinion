<script lang="ts">
	import { onDestroy } from 'svelte';
	// import { subscribeToAuthState } from '../auth';

	let user: any = null;

	// const unsubscribe = subscribeToAuthState((u) => {
	// 	user = u;
	// });
	//
	// onDestroy(() => unsubscribe());
</script>

<header class="navbar bg-base-100">
	<div class="">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-circle btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<ul
				tabindex="-1"
				class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
			>
				<li><a href="/">Homepage</a></li>
				<li><a href="/portfolio">Portfolio</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div>
	</div>
	<div class="flex-1">
		<img alt="logo" src="/favicon.png" class="w-10 rounded-full" />
		<a href="/" class="btn btn-ghost text-xl">kgopinion</a>
	</div>
	<div class="flex-none gap-2">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
		</div>
		{#if user}
			<p>Welcome, {user?.email || 'Anonymous User'}!</p>
		{:else}
			<a href="/auth">Sign In</a>
		{/if}
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
				<img alt="logo" src="/favicon.png" class="w-10 rounded-full" />
			</div>
			<ul class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
				<li>
					<a href="/profile" class="justify-between">
						Profile
						<span class="badge">New</span>
					</a>
				</li>
				<li><a href="/editor">Add Post</a></li>
				<li><a href="/settings">Settings</a></li>
				<li><a href="/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</header>
