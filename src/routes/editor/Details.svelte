<script lang="ts">
	let { togglePreview }: { togglePreview: () => void } = $props();

	import { post } from './post.svelte';
	import { deleteImage, savePostOrUpdate, togglePublish } from '../../lib/utils';
	import { Button } from '$lib';
	import { extra } from './extra.svelte';

	async function selectImage() {
    extra.showImageModal = true;
    extra.featured = true;
			// post.featuredImage = await uploadImage(imageFile, `images/featured/${imageFile.name}`);
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
    <Button title="Preview" cb={togglePreview} class="btn-primary" />
    <Button title="Save Draft" cb={() => savePostOrUpdate(post)} />
    <Button title="Publish" cb={() => togglePublish(post.slug!, true)} class="btn-secondary"/>
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

   <!-- Tags -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Categories</span>
      </label>
      <div class="flex flex-wrap gap-2 mb-2">
        {#each post.categories as cat}
          <div class="badge badge-primary gap-1">
            {cat}
            <button onclick={() => removeCategory(cat)} class="btn btn-xs btn-circle">×</button>
          </div>
        {/each}
      </div>
      <div class="join w-full">
        <input 
          type="text" 
          bind:value={newCategory} 
			onkeydown={(e) => handleKeyDown(e, addCategory)}
          placeholder="Add a tag" 
          class="input input-bordered join-item w-full"
        />
      </div>
    </div> 

   <!-- Tags -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Keywords</span>
      </label>
      <div class="flex flex-wrap gap-2 mb-2">
        {#each post.keywords as key}
          <div class="badge badge-primary gap-1">
            {key}
            <button onclick={() => removeKeyword(key)} class="btn btn-xs btn-circle">×</button>
          </div>
        {/each}
      </div>
      <div class="join w-full">
        <input 
          type="text" 
          bind:value={newKeyword} 
			onkeydown={(e) => handleKeyDown(e, addKeyword)}
          placeholder="Add a tag" 
          class="input input-bordered join-item w-full"
        />
      </div>
    </div> 
 
		<label for="image" class="label">
			<span class="label-text">Featured Image</span>
		</label>
	  <Button title="Select Featured Image" cb={selectImage} />

   
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
