<script lang="ts">
	let { togglePreview }: { togglePreview: () => void } = $props();

	import { post } from './post.svelte';
	import { deleteImage, savePostOrUpdate, togglePublish, uploadImage } from '../../lib/utils';

	async function handleImageSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const imageFile = input.files[0];
			post.featuredImage = await uploadImage(imageFile, `images/featured/${imageFile.name}`);
		}
	}
	let newCategory = $state('');
	let newKeyword = $state('');
	function addCategory() {
		if (newCategory && !post.categories.includes(newCategory)) {
			post.categories = [...post.categories, newCategory];
			newCategory = '';
		}
	}
	function handleKeyDown(event: KeyboardEvent, cb: () => void) {
		if (event.key === 'Enter') {
			cb();
		}
	}

	function removeCategory(category: string) {
		post.categories = post.categories.filter((c) => c !== category);
	}

	function addKeyword() {
		if (newKeyword && !post.keywords.includes(newKeyword)) {
			post.keywords = [...post.keywords, newKeyword];
			newKeyword = '';
		}
	}

	function removeKeyword(keyword: string) {
		post.keywords = post.keywords.filter((k) => k !== keyword);
	}
</script>

<!-- Right Column - Post Details -->
<div class="space-y-4 rounded-box bg-base-100 p-4 shadow-lg">
	<div class="flex gap-2">
		<button onclick={() => togglePreview()} class="btn btn-primary flex-1"> Preview </button>
		<button onclick={() => savePostOrUpdate(post)} class="btn btn-success flex-1">
			Save Draft
		</button>
		<button
			onclick={() => togglePublish(post.slug!, true)}
			disabled={post.slug.length === 0}
			class="btn btn-accent flex-1"
		>
			Publish
		</button>
	</div>
	<div class="divider"></div>
	<h2 class="text-lg font-bold">Post Details</h2>

	<div class="form-control">
		<label class="label" for="title">
			<span class="label-text">Title</span>
		</label>
		<input type="text" id="title" bind:value={post.title} class="input input-bordered" />
		<label class="label" for="excerpt">
			<span class="label-text">Excerpt</span>
		</label>

		<textarea id="excerpt" bind:value={post.excerpt} class="textarea textarea-bordered h-24"
		></textarea>

		<label for="image" class="label">
			<span class="label-text">Featured Image</span>
		</label>
		<input
			type="file"
			id="image"
			accept="image/*"
			onchange={handleImageSelect}
			class="file-input file-input-bordered w-full"
		/>

		<label for="" class="label">Categories</label>
		<div class="mb-2 flex flex-wrap gap-2">
			{#each post.categories as category}
				<span class="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
					{category}
					<button
						onclick={() => removeCategory(category)}
						class="ml-1 text-blue-600 hover:text-blue-800">×</button
					>
				</span>
			{/each}
		</div>
		<input
			type="text"
			bind:value={newCategory}
			onkeydown={(e) => handleKeyDown(e, addCategory)}
			placeholder="Add a category"
			class="input input-bordered mb-4"
		/>

		<label for="keywords" class="label">Keywords</label>
		<div class="mb-2 flex flex-wrap gap-2">
			{#each post.keywords as keyword}
				<span class="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
					{keyword}
					<button
						onclick={() => removeKeyword(keyword)}
						class="ml-1 text-green-600 hover:text-green-800">×</button
					>
				</span>
			{/each}
		</div>
		<input
			type="text"
			id="keywords"
			bind:value={newKeyword}
			onkeydown={(e) => handleKeyDown(e, addKeyword)}
			placeholder="Add a keyword"
			class="input input-bordered"
		/>

		{#if post.featuredImage}
			<div class="relative w-full">
				<img
					src={post.featuredImage}
					alt="Post featured preview"
					class="h-48 w-full rounded-lg object-cover"
				/>
				<button
					class="btn btn-circle btn-sm absolute right-2 top-2"
					onclick={() => deleteImage(post.featuredImage!)}
				>
					✕
				</button>
			</div>
		{/if}
	</div>
</div>
