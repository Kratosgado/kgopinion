<header class="navbar mx-4 bg-base-100 shadow-lg">
	<img alt="logo" src="/favicon.png" class="w-10 rounded-full" />

	<div class="container mx-auto">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl normal-case">KgOpinion</a>
		</div>
		<div class="hidden flex-none md:block">
			<ul class="menu menu-horizontal px-1">
				<li><a href="/" class="font-medium">Home</a></li>
				<li><a href="/articles" class="font-medium">Articles</a></li>
				<li><a href="/categories" class="font-medium">Categories</a></li>
				<li><a href="/about" class="font-medium">About</a></li>
				<li><a href="/contact" class="font-medium">Contact</a></li>
			</ul>
		</div>
		<div class="md flex-none">
			<div class="dropdown dropdown-end">
				<label for="" tabindex="-1" class="btn btn-circle btn-ghost">
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
				</label>
				<ul
					tabindex="-2"
					class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href="/">Home</a></li>
					<li><a href="/articles">Articles</a></li>
					<li><a href="/categories">Categories</a></li>
					<li><a href="/about">About</a></li>
					<li><a href="/contact">Contact</a></li>
				</ul>
			</div>
		</div>
	</div>
</header>
