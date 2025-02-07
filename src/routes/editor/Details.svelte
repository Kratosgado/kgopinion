<script lang="ts">
	let { togglePreview }: { togglePreview: Function } = $props();

	import { post } from './post.svelte';
	import { savePostOrUpdate, togglePublish } from '../../lib/utils';
</script>

<!-- Right Column - Post Details -->
<div class="space-y-4 rounded-box bg-base-100 p-4 shadow-lg">
	<div class="flex gap-2">
		<button onclick={() => togglePreview()} class="btn btn-primary flex-1"> Preview </button>
		<button onclick={() => savePostOrUpdate(post)} class="btn btn-success flex-1">
			Save Draft
		</button>
		<button
			onclick={() => togglePublish(post.id!!, true)}
			disabled={post.slug.length === 0}
			class="btn btn-accent flex-1"
		>
			Publish
		</button>
	</div>
	<div class="divider"></div>
	<h2 class="text-lg font-bold">Post Details</h2>

	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Title</span>
		</label>
		<input type="text" bind:value={post.title} class="input input-bordered" />
	</div>

	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Slug</span>
		</label>
		<input type="text" bind:value={post.slug} class="input input-bordered" />
	</div>

	<div class="form-control">
		<label class="label" for="">
			<span class="label-text">Excerpt</span>
		</label>
		<textarea bind:value={post.excerpt} class="textarea textarea-bordered h-24"></textarea>
	</div>

	<div class="form-control">
		<label for="" class="label">
			<span class="label-text">Featured Image</span>
		</label>
		<input type="file" accept="image/*" class="file-input file-input-bordered w-full" />
	</div>
</div>
