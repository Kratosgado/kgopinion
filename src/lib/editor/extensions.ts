import type { Extensions } from '@tiptap/core';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Focus from '@tiptap/extension-focus';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Dropcursor from '@tiptap/extension-dropcursor';
import FontFamily from '@tiptap/extension-font-family';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TableHeader from '@tiptap/extension-table-header';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import SlashCommands from './SlashCommands';
import BubbleMenu from '@tiptap/extension-bubble-menu';

export const extensions: Extensions = [
	StarterKit,
	Image.configure({
		HTMLAttributes: {
			class: 'rounded-box shadow-lg mx-auto max-w-full h-auto cursor-move',
			draggable: true
		},
		allowBase64: true
	}),
	Link.configure({
		openOnClick: false,
		HTMLAttributes: {
			class: 'text-primary underline'
		}
	}),
	Youtube.configure({
		width: 640,
		height: 480,
		controls: true
	}),
	TextAlign.configure({
		types: ['heading', 'paragraph']
	}),
	Placeholder.configure({
		placeholder: 'Start writing your article...'
	}),
	SlashCommands,
	BubbleMenu,
	Paragraph,
	// CodeBlockLowlight.configure({ lowlight }),
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	// TextStyle.configure({ types: [ListItem.name] }),
	FontFamily,
	Highlight,
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
];
