<script lang="ts">
	import { Color } from '@tiptap/extension-color';
	import ListItem from '@tiptap/extension-list-item';
	import TextStyle from '@tiptap/extension-text-style';
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				Color.configure({ types: [TextStyle.name, ListItem.name] }),
				TextStyle.configure({ types: [ListItem.name] }),
				// TextStyle.configure(),
				StarterKit
			],
			content: ``,
			onTransaction: () => {
				// Force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});
</script>

{#if editor}
	<div class="control-group">
		<!-- <div class="button-group mb-4 flex flex-wrap gap-2"> -->
		<div class="">
			<button
				on:click={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				class:is-active={editor.isActive('bold')}
				class="btn px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			>
				Bold
			</button>
			<button
				on:click={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				class:is-active={editor.isActive('italic')}
				class="btn px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			>
				Italic
			</button>
			<button
				on:click={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				class:is-active={editor.isActive('strike')}
				class="btn px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			>
				Strike
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				class:is-active={editor.isActive('code')}
				class="btn px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			>
				Code
			</button>
			<button
				on:click={() => editor.chain().focus().unsetAllMarks().run()}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Clear marks
			</button>
			<button
				on:click={() => editor.chain().focus().clearNodes().run()}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Clear nodes
			</button>
			<button
				on:click={() => editor.chain().focus().setParagraph().run()}
				class:is-active={editor.isActive('paragraph')}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Paragraph
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				class:is-active={editor.isActive('heading', { level: 1 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H1
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				class:is-active={editor.isActive('heading', { level: 2 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H2
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				class:is-active={editor.isActive('heading', { level: 3 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H3
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				class:is-active={editor.isActive('heading', { level: 4 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H4
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				class:is-active={editor.isActive('heading', { level: 5 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H5
			</button>
			<button
				on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				class:is-active={editor.isActive('heading', { level: 6 })}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				H6
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class:is-active={editor.isActive('bulletList')}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Bullet list
			</button>
			<button
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class:is-active={editor.isActive('orderedList')}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Ordered list
			</button>
			<button
				on:click={() => editor.chain().focus().toggleCodeBlock().run()}
				class:is-active={editor.isActive('codeBlock')}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Code block
			</button>
			<button
				on:click={() => editor.chain().focus().toggleBlockquote().run()}
				class:is-active={editor.isActive('blockquote')}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Blockquote
			</button>
			<button
				on:click={() => editor.chain().focus().setHorizontalRule().run()}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Horizontal rule
			</button>
			<button
				on:click={() => editor.chain().focus().setHardBreak().run()}
				class="btn px-4 py-2 hover:bg-gray-300"
			>
				Hard break
			</button>
			<button
				on:click={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				class="btn px-4 py-2 hover:bg-gray-300 disabled:opacity-50"
			>
				Undo
			</button>
			<button
				on:click={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				class="btn btn-primary hover:bg-gray-300 disabled:opacity-50"
			>
				Redo
			</button>
			<button
				on:click={() => editor.chain().focus().setColor('#958DF1').run()}
				class:is-active={editor.isActive('textStyle', { color: '#958DF1' })}
				class="btn btn-primary hover:bg-gray-300 disabled:opacity-50"
			>
				Purple
			</button>
		</div>
	</div>
{/if}

<div bind:this={element} class="prose max-w-none" />
