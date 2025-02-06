<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';

	let { togglePreview }: { togglePreview: Function } = $props();

	function onImageUpload(e: Event) {}

	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import * as lowlight from 'lowlight';
	import { post } from './post.svelte.ts';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

	// Editor state
	let element: HTMLDivElement;
	let editor: Editor;
	const storage = getStorage();

	// Editor initialization
	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Image.configure({
					HTMLAttributes: {
						class: 'rounded-box shadow-lg mx-auto max-w-full h-auto cursor-move',
						draggable: true
					}
				}),
				CodeBlockLowlight.configure({
					lowlight,
					HTMLAttributes: {
						class: 'bg-base-200 p-4 rounded-box'
					}
				})
			],
			content: post.content,
			onUpdate: ({ editor }) => {
				post.content = editor.getHTML();
			}
		});
	});
</script>

<!-- Right Column - Post Details -->
<div class="space-y-4 rounded-box bg-base-100 p-4 shadow-lg">
	<div class="flex gap-2">
		<button onclick={() => togglePreview()} class="btn btn-primary flex-1"> Preview </button>
		<button class="btn btn-success flex-1"> Save Draft </button>
		<button class="btn btn-accent flex-1"> Publish </button>
	</div>
	<div class="divider"></div>
	<h2 class="text-lg font-bold">Post Details</h2>

	<div class="form-control">
		<label class="label">
			<span class="label-text">Title</span>
		</label>
		<input type="text" bind:value={post.title} class="input input-bordered" />
	</div>

	<div class="form-control">
		<label class="label">
			<span class="label-text">Slug</span>
		</label>
		<input type="text" bind:value={post.slug} class="input input-bordered" />
	</div>

	<div class="form-control">
		<label class="label">
			<span class="label-text">Excerpt</span>
		</label>
		<textarea bind:value={post.excerpt} class="textarea textarea-bordered h-24" />
	</div>

	<div class="form-control">
		<label class="label">
			<span class="label-text">Featured Image</span>
		</label>
		<input type="file" accept="image/*" class="file-input file-input-bordered w-full" />
	</div>
</div>
