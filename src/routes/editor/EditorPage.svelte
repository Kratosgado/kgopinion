<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Document from '@tiptap/extension-document';
	import Paragraph from '@tiptap/extension-paragraph';
	import Text from '@tiptap/extension-text';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import Color from '@tiptap/extension-color';
	import TextStyle from '@tiptap/extension-text-style';
	import FontFamily from '@tiptap/extension-font-family';
	import Highlight from '@tiptap/extension-highlight';
	import * as TImage from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import TextAlign from '@tiptap/extension-text-align';
	import Underline from '@tiptap/extension-underline';
	import Subscript from '@tiptap/extension-subscript';
	import Superscript from '@tiptap/extension-superscript';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableHeader from '@tiptap/extension-table-header';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import Typography from '@tiptap/extension-typography';
	import Focus from '@tiptap/extension-focus';
	import Dropcursor from '@tiptap/extension-dropcursor';
	import ListItem from '@tiptap/extension-list-item';

	// Lowlight for code highlighting
	import { all, createLowlight } from 'lowlight';
	import css from 'highlight.js/lib/languages/css';
	import html from 'highlight.js/lib/languages/xml';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';

	import { post } from './post.svelte';
	import SlashCommands from '$lib/editor/SlashCommands';

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
			extensions: [
				// Slash commands
				SlashCommands,
				Document,
				Paragraph,
				Text,
				StarterKit.configure({
					document: false,
					paragraph: false,
					text: false,
					codeBlock: false
				}),
				CodeBlockLowlight.configure({ lowlight }),
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure({ types: [ListItem.name] }),
				FontFamily,
				Highlight,
				TImage.Image.configure({
					HTMLAttributes: {
						class: 'rounded-box shadow-lg mx-auto max-w-full h-auto cursor-move',
						draggable: true
					},
					allowBase64: true
				}),
				Link,
				TaskList,
				TaskItem.configure({ nested: true }),
				TextAlign.configure({ types: ['heading', 'paragraph'] }),
				Underline,
				Subscript,
				Superscript,
				// Table.configure({ resizable: true }),
				// TableRow,
				TableHeader,
				CharacterCount,
				Placeholder.configure({
					placeholder: 'Write something ...'
				}),
				Typography,
				Focus.configure({
					className: 'focus-ring',
					mode: 'all'
				}),
				Dropcursor.configure({
					class: 'dropcursor',
					width: 2,
					color: '#958DF1'
				})

				// Pro extensions
				// Details,
				// DetailsContent,
				// DetailsSummary,
				// DragHandle,
				// Emoji,
				// FileHandler.configure({
				// 	allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
				// 	onDrop: handleDrop
				// }),
				// Mathematics,
				// NodeRange,
				// TableOfContents,
				// UniqueID.configure({
				// 	types: ['heading']
				// }),
			],
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

<!-- <div bind:this={element} class="prose max-w-none"></div> -->

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
