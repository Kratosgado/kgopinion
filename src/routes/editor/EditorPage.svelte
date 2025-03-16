<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import { post } from './post.svelte';
	import { extensions,LinkModal, ImageModal, Toolbar, YoutubeModal } from '$lib';

	let element: HTMLDivElement;
	let editor: Editor;
	let characterCount = 0;

	// Initialize editor on mount
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions,
			content: post.content,
			onUpdate: ({ editor }) => {
				post.content = editor.getHTML();
				characterCount = editor.storage.characterCount.characters();
			},
			onTransaction: () => {
				editor = editor;
			}
		});

	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="editor-container relative">
	{#if editor}
		<div class="character-count mb-2 text-sm text-gray-500">
			Characters: {characterCount}
		</div>
    <Toolbar {editor} />
	{/if}

	<div bind:this={element} class="prose min-h-[500px] max-w-none"></div>

	{#if editor}
		<div class="editor-info mt-2 text-sm text-gray-500">
			<span>Type <kbd>/</kbd> for commands</span>
			|
			<span>Use <kbd>Tab</kbd> to select highlighted command</span>
		</div>
	{/if}
</div>

<YoutubeModal { editor }/>
<LinkModal {editor} />
<ImageModal {editor} />

<style>
	.editor-container {
		width: 1200px;
	}

	.prose :global(img) {
		cursor: move;
		transition: transform 0.2s ease;
	}

	.prose :global(img):hover {
		transform: scale(1.02);
	}

	.prose :global(.dropcursor) {
		border-radius: 0.25rem;
	}

	.prose :global(.focus-ring) {
		border-radius: 0.25rem;
		box-shadow: 0 0 0 2px rgba(149, 141, 241, 0.4);
	}

	kbd {
		background-color: #f7f7f7;
		border: 1px solid #ccc;
		border-radius: 3px;
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
		color: #333;
		display: inline-block;
		font-size: 0.85em;
		font-weight: 700;
		line-height: 1;
		padding: 2px 4px;
		white-space: nowrap;
	}
</style>
