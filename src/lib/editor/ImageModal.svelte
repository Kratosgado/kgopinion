<script lang="ts">
	import type { Editor } from "@tiptap/core";
	import { extra } from "../../routes/editor/extra.svelte";

  let { editor }: { editor: Editor} = $props();
	let	imageUrl= $state('');
	let imageAlt = $state('');
	let imageWidth = $state('');
	let imageHeight =$state('');
  
    function insertImage() {
    if (imageUrl) {
      const attrs = { 
        src: imageUrl,
        alt: imageAlt,
      };
      
      if (imageWidth) attrs.width = imageWidth;
      if (imageHeight) attrs.height = imageHeight;
      
      editor.chain().focus().setImage(attrs).run();
      
      // Reset form
      imageUrl = '';
      imageAlt = '';
      imageWidth = '';
      imageHeight = '';
      extra.showImageModal = false;
    }
  }


</script>
<!-- Image Modal -->
{#if extra.showImageModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Insert Image</h3>
      <div class="form-control w-full mt-4">
        <label for=""class="label">
          <span class="label-text">Image URL</span>
        </label>
        <input type="text" bind:value={imageUrl} placeholder="https://example.com/image.jpg" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full mt-2">
        <label for=""class="label">
          <span class="label-text">Alt Text</span>
        </label>
        <input type="text" bind:value={imageAlt} placeholder="Image description" class="input input-bordered w-full" />
      </div>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <div class="form-control w-full">
          <label for=""class="label">
            <span class="label-text">Width (optional)</span>
          </label>
          <input type="text" bind:value={imageWidth} placeholder="e.g., 300px or 50%" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label for=""class="label">
            <span class="label-text">Height (optional)</span>
          </label>
          <input type="text" bind:value={imageHeight} placeholder="e.g., 200px" class="input input-bordered w-full" />
        </div>
      </div>
      <div class="modal-action">
        <button class="btn" onclick={() => extra.showImageModal = false}>Cancel</button>
        <button class="btn btn-primary" onclick={insertImage}>Insert</button>
      </div>
    </div>
  </div>
{/if}

