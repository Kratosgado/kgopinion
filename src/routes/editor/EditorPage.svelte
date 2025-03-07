<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	// Lowlight for code highlighting
	import { all, createLowlight } from 'lowlight';
	import css from 'highlight.js/lib/languages/css';
	import html from 'highlight.js/lib/languages/xml';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';

	import { post } from './post.svelte';
	import { handleImageUpload } from '$lib/utils/imageUpload';
	import { extensions } from '$lib';

	let element: HTMLDivElement;
	let editor: Editor;
	let characterCount = 0;

	// Setup lowlight for code highlighting
	const lowlight = createLowlight(all);
	lowlight.register('html', html);
	lowlight.register('css', css);
	lowlight.register('js', js);
	lowlight.register('ts', ts);

	// Initialize editor on mount
	onMount(() => {
		editor = new Editor({
			element: element,
			extensions ,
			content: post.content,
			onUpdate: ({ editor }) => {
				post.content = editor.getHTML();
				characterCount = editor.storage.characterCount.characters();
			},
			onTransaction: () => {
				// Force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});

		// Add paste handler for images
		element.addEventListener('paste', (event) => {
			const items = event.clipboardData?.items;
			if (items) {
				for (let i = 0; i < items.length; i++) {
					if (items[i].type.indexOf('image') === 0) {
						event.preventDefault();
						const file = items[i].getAsFile();
						if (file) {
							handleImageUpload(file, editor);
						}
						break;
					}
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<!-- Simple floating menu for mobile that appears only when text is selected -->

<div class="editor-container relative">
	{#if editor}
		<div class="character-count mb-2 text-sm text-gray-500">
			Characters: {characterCount}
		</div>
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
