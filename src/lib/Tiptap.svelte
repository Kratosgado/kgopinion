<!-- <script> -->
<!-- 	import { onMount, onDestroy } from 'svelte'; -->
<!-- 	import { Editor } from '@tiptap/core'; -->
<!-- 	import StarterKit from '@tiptap/starter-kit'; -->
<!-- 	import Bold from '@tiptap/extension-bold'; -->
<!-- 	import Italic from '@tiptap/extension-italic'; -->
<!-- 	import BulletList from '@tiptap/extension-bullet-list'; -->
<!-- 	import OrderedList from '@tiptap/extension-ordered-list'; -->
<!---->
<!-- 	let element; -->
<!-- 	let editor; -->
<!---->
<!-- 	onMount(() => { -->
<!-- 		editor = new Editor({ -->
<!-- 			element: element, -->
<!-- 			extensions: [StarterKit, Bold, Italic, BulletList, OrderedList], -->
<!-- 			content: '<p>Start writing your post here... ✍️</p>', -->
<!-- 			onTransaction: () => { -->
<!-- 				editor = editor; // Force update -->
<!-- 			} -->
<!-- 		}); -->
<!-- 	}); -->
<!---->
<!-- 	onDestroy(() => { -->
<!-- 		editor?.destroy(); -->
<!-- 	}); -->
<!-- </script> -->
<!---->
<!-- <div class="editor-container"> -->
<!-- 	<div class="toolbar"> -->
<!-- 		{#if editor} -->
<!-- 			<div class="toolbar-group"> -->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} -->
<!-- 					class:active={editor.isActive('heading', { level: 1 })} -->
<!-- 					title="Heading 1" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!---->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} -->
<!-- 					class:active={editor.isActive('heading', { level: 2 })} -->
<!-- 					title="Heading 2" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M16 8v8h-2v-3.23a6.488 6.488 0 0 1-2 .599V16h-2V4h2v3.744a5.546 5.546 0 0 1 2-.357h3v2h-3zm4 12h-2V4h2v16z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!---->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().setParagraph().run()} -->
<!-- 					class:active={editor.isActive('paragraph')} -->
<!-- 					title="Paragraph" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M12 6v15h-2v-5H6v5H4V6h2v5h4V6h2zm10 0v2h-8V6h8zm0 4v2h-8v-2h8zm0 4v2h-8v-2h8zm0 4v2h-8v-2h8z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!-- 			</div> -->
<!---->
<!-- 			<div class="toolbar-group"> -->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleBold().run()} -->
<!-- 					class:active={editor.isActive('bold')} -->
<!-- 					title="Bold" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.5A4.5 4.5 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!---->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleItalic().run()} -->
<!-- 					class:active={editor.isActive('italic')} -->
<!-- 					title="Italic" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15v2z" /> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!-- 			</div> -->
<!---->
<!-- 			<div class="toolbar-group"> -->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleBulletList().run()} -->
<!-- 					class:active={editor.isActive('bulletList')} -->
<!-- 					title="Bullet List" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M8 4h13v2H8V4zm-5.5 0h3v3h-3V4zm0 7h3v3h-3v-3zm0 7h3v3h-3v-3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!---->
<!-- 				<button -->
<!-- 					on:click={() => editor.chain().focus().toggleOrderedList().run()} -->
<!-- 					class:active={editor.isActive('orderedList')} -->
<!-- 					title="Numbered List" -->
<!-- 				> -->
<!-- 					<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"> -->
<!-- 						<path -->
<!-- 							d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zm3 7h13v2H8v-2zm-3 2.5V12H3v-1.5h2v-.5H3v-1h3V12H4v.5h2v.5H3v1h3zm2 5.5H3v-1.5h2v-.5H3v-1h3V16H4v.5h2v.5H3v1h3zm1-1.5h13v2H8v-2z" -->
<!-- 						/> -->
<!-- 					</svg> -->
<!-- 				</button> -->
<!-- 			</div> -->
<!-- 		{/if} -->
<!-- 	</div> -->
<!---->
<!-- 	<div class="content-area" bind:this={element} /> -->
<!-- </div> -->
<!---->
<!-- <style> -->
<!-- 	.editor-container { -->
<!-- 		max-width: 800px; -->
<!-- 		margin: 2rem auto; -->
<!-- 		border: 1px solid #e5e7eb; -->
<!-- 		border-radius: 8px; -->
<!-- 		background: white; -->
<!-- 		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); -->
<!-- 	} -->
<!---->
<!-- 	.toolbar { -->
<!-- 		padding: 0.5rem; -->
<!-- 		border-bottom: 1px solid #e5e7eb; -->
<!-- 		display: flex; -->
<!-- 		gap: 0.5rem; -->
<!-- 		flex-wrap: wrap; -->
<!-- 		background: #f9fafb; -->
<!-- 		border-radius: 8px 8px 0 0; -->
<!-- 	} -->
<!---->
<!-- 	.toolbar-group { -->
<!-- 		display: flex; -->
<!-- 		gap: 2px; -->
<!-- 		padding: 0 0.5rem; -->
<!-- 		border-right: 1px solid #e5e7eb; -->
<!-- 	} -->
<!---->
<!-- 	button { -->
<!-- 		padding: 0.5rem; -->
<!-- 		border: none; -->
<!-- 		background: none; -->
<!-- 		color: #374151; -->
<!-- 		border-radius: 4px; -->
<!-- 		cursor: pointer; -->
<!-- 		transition: all 0.2s ease; -->
<!-- 		display: grid; -->
<!-- 		place-items: center; -->
<!-- 	} -->
<!---->
<!-- 	button:hover { -->
<!-- 		background: #e5e7eb; -->
<!-- 	} -->
<!---->
<!-- 	button.active { -->
<!-- 		background: #3b82f6; -->
<!-- 		color: white; -->
<!-- 	} -->
<!---->
<!-- 	button.active:hover { -->
<!-- 		background: #2563eb; -->
<!-- 	} -->
<!---->
<!-- 	.icon { -->
<!-- 		width: 1.25rem; -->
<!-- 		height: 1.25rem; -->
<!-- 		fill: currentColor; -->
<!-- 	} -->
<!---->
<!-- 	.content-area { -->
<!-- 		padding: 1.5rem; -->
<!-- 		min-height: 300px; -->
<!-- 		outline: none; -->
<!-- 	} -->
<!---->
<!-- 	.content-area:focus { -->
<!-- 		box-shadow: inset 0 0 0 2px #3b82f6; -->
<!-- 	} -->
<!---->
<!-- 	.prose :global(p) { -->
<!-- 		margin: 0.75em 0; -->
<!-- 		line-height: 1.75; -->
<!-- 	} -->
<!---->
<!-- 	.prose :global(h1) { -->
<!-- 		font-size: 2rem; -->
<!-- 		font-weight: 700; -->
<!-- 		margin: 1.5rem 0; -->
<!-- 	} -->
<!---->
<!-- 	.prose :global(h2) { -->
<!-- 		font-size: 1.5rem; -->
<!-- 		font-weight: 600; -->
<!-- 		margin: 1.25rem 0; -->
<!-- 	} -->
<!---->
<!-- 	.prose :global(ul), -->
<!-- 	.prose :global(ol) { -->
<!-- 		padding-left: 1.5rem; -->
<!-- 		margin: 0.75rem 0; -->
<!-- 	} -->
<!-- </style> -->
