<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import * as lowlight from 'lowlight';
	import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { db } from '$lib/firebase';
	import { doc, setDoc, Timestamp } from 'firebase/firestore';
	import { auth } from '$lib/firebase';
	import type { Post, SEO } from '$lib/types';

	// Editor state
	let element: HTMLDivElement;
	let editor: Editor;
	const storage = getStorage();

	// Form state
	let post: Post = $state({
		title: '',
		content: '',
		slug: '',
		published: false,
		author: auth.currentUser?.uid || '',
		categories: [],
		featuredImage: '',
		excerpt: '',
		seo: {
			title: '',
			description: '',
			keywords: []
		},
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now()
	});

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

	// ... (rest of your existing functions)
</script>

<div class="min-h-screen bg-base-200 p-4">
	<div class="grid h-[calc(100vh-2rem)] grid-cols-[300px_1fr_300px] gap-4">
		<!-- Left Column - Elements Panel -->
		<div class="rounded-box bg-base-100 p-4 shadow-lg">
			<h2 class="mb-4 text-lg font-bold">Add Elements</h2>
			<div class="space-y-2">
				<button
					on:click={() => editor.chain().focus().insertContent('<p>New Paragraph</p>').run()}
					class="btn btn-sm btn-block"
				>
					+ Paragraph
				</button>
				<button
					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
					class="btn btn-sm btn-block"
				>
					+ Heading
				</button>
				<button
					on:click={() => editor.chain().focus().toggleCodeBlock().run()}
					class="btn btn-sm btn-block"
				>
					+ Code Block
				</button>
				<input
					type="file"
					accept="image/*"
					id="image-upload"
					class="hidden"
					on:change={(e) => handleImageUpload(e.target.files?.[0])}
				/>
				<label for="image-upload" class="btn btn-sm btn-block"> + Image </label>
			</div>
		</div>

		<!-- Middle Column - Editor -->
		<div class="flex flex-col rounded-box bg-base-100 shadow-lg">
			<!-- Toolbar -->
			<div class="flex flex-wrap gap-2 rounded-t-box bg-base-200 p-2">
				{#if editor}
					<div class="join">
						<button
							on:click={() => editor.chain().focus().toggleBold().run()}
							class="btn join-item btn-sm {editor.isActive('bold') ? 'btn-active' : ''}"
						>
							B
						</button>
						<button
							on:click={() => editor.chain().focus().toggleItalic().run()}
							class="btn join-item btn-sm {editor.isActive('italic') ? 'btn-active' : ''}"
						>
							I
						</button>
						<button
							on:click={() => editor.chain().focus().toggleStrike().run()}
							class="btn join-item btn-sm {editor.isActive('strike') ? 'btn-active' : ''}"
						>
							S
						</button>
					</div>

					<div class="join">
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
							class="btn join-item btn-sm {editor.isActive('heading', { level: 1 })
								? 'btn-active'
								: ''}"
						>
							H1
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
							class="btn join-item btn-sm {editor.isActive('heading', { level: 2 })
								? 'btn-active'
								: ''}"
						>
							H2
						</button>
						<button
							on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
							class="btn join-item btn-sm {editor.isActive('heading', { level: 3 })
								? 'btn-active'
								: ''}"
						>
							H3
						</button>
					</div>

					<div class="join">
						<button
							on:click={() => editor.chain().focus().toggleBulletList().run()}
							class="btn join-item btn-sm {editor.isActive('bulletList') ? 'btn-active' : ''}"
						>
							<svg>...</svg>
						</button>
						<button
							on:click={() => editor.chain().focus().toggleOrderedList().run()}
							class="btn join-item btn-sm {editor.isActive('orderedList') ? 'btn-active' : ''}"
						>
							<svg>...</svg>
						</button>
					</div>
				{/if}
			</div>

			<!-- Editor Content -->
			<div bind:this={element} class="prose max-w-none flex-1 overflow-y-auto p-4" />
		</div>

		<!-- Right Column - Post Details -->
		<div class="space-y-4 rounded-box bg-base-100 p-4 shadow-lg">
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
				<input
					type="file"
					accept="image/*"
					class="file-input file-input-bordered w-full"
					on:change={(e) => handleImageUpload(e.target.files?.[0])}
				/>
			</div>

			<div class="divider"></div>

			<div class="flex gap-2">
				<button class="btn btn-primary flex-1"> Preview </button>
				<button class="btn btn-success flex-1"> Save Draft </button>
				<button class="btn btn-accent flex-1"> Publish </button>
			</div>
		</div>
	</div>
</div>

<style>
	.prose :global(img) {
		cursor: move;
		transition: transform 0.2s ease;
	}

	.prose :global(img):hover {
		transform: scale(1.02);
	}

	.prose :global(.dragging) {
		opacity: 0.5;
	}
</style>
