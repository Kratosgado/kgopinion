<script lang="ts">
	let { togglePreview }: { togglePreview: Function } = $props();

	import { post } from './post.svelte';
	import { deleteImage, savePostOrUpdate, togglePublish, uploadImage } from '../../lib/utils';

  async function handleImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files[0]){
      const imageFile =input.files[0]
      post.featuredImage = await uploadImage(imageFile,`images/featured/${imageFile.name}`)
    }
  }
</script>

<!-- Right Column - Post Details -->
<div class="space-y-4 rounded-box bg-base-100 p-4 shadow-lg">
    <div class="flex gap-2">
        <button onclick={() => togglePreview()} class="btn btn-primary flex-1">
            Preview
        </button>
		<button onclick={() => savePostOrUpdate(post)} class="btn btn-success flex-1">
            Save Draft
        </button>
        <button
            onclick={() => togglePublish(post.slug!!, true)}
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
    </div>
    <div class="form-control">
        <label class="label" for="excerpt">
            <span class="label-text">Excerpt</span>
        </label>
        <textarea 
            id="excerpt"
            bind:value={post.excerpt} 
            class="textarea textarea-bordered h-24"
        ></textarea>
    </div>
    <div class="form-control">
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
    </div>
    {#if post.featuredImage}
        <div class="relative w-full">
            <img 
                src={post.featuredImage} 
                alt="Post featured preview" 
                class="w-full h-48 object-cover rounded-lg"
            />
            <button 
                class="btn btn-circle btn-sm absolute top-2 right-2"
                onclick={() => deleteImage(post.featuredImage!!)}
            >
                ✕
            </button>
        </div>
    {/if}
</div>
