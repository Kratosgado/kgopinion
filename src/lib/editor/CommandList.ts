import type { Editor } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';

// Command suggestion configuration
export const suggestions = (editor: Editor) => Suggestion({
  editor: editor,
  char: '/',
  items: ({ query }) => {
    const commands = [
      {
        title: 'Heading 1',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
        }
      },
      {
        title: 'Heading 2',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
        }
      },
      {
        title: 'Heading 3',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
        }
      },
      {
        title: 'Bullet List',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        }
      },
      {
        title: 'Numbered List',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        }
      },
      {
        title: 'Task List',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        }
      },
      {
        title: 'Code Block',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        }
      },
      {
        title: 'Blockquote',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        }
      },
      {
        title: 'Horizontal Rule',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        }
      },
      {
        title: 'Table',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3 }).run();
        }
      },
      {
        title: 'Image',
        command: ({ editor, range }) => {
          // Open a file picker dialog
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async () => {
            if (input.files?.length) {
              const file = input.files[0];
              await handleImageUpload(file, editor, range);
            }
          };
          input.click();
        }
      },
      {
        title: 'Mathematics',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertMathInline().run();
        }
      },
      {
        title: 'Emoji',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertEmoji({ emoji: '😀' }).run();
        }
      },
      {
        title: 'Details',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).insertDetails().run();
        }
      }
    ];

    return commands.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  },
  render: () => {
    let popup: HTMLElement;
    let items: HTMLElement[];
    let selectedIndex = 0;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection();
        event.preventDefault();
      }

      if (event.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection();
        event.preventDefault();
      }

      if (event.key === 'Enter') {
        items[selectedIndex]?.click();
        event.preventDefault();
      }
    };

    const updateSelection = () => {
      items.forEach((item, index) => {
        if (index === selectedIndex) {
          item.classList.add('bg-gray-200');
        } else {
          item.classList.remove('bg-gray-200');
        }
      });
    };

    return {
      onStart: (props) => {
        popup = document.createElement('div');
        popup.classList.add(
          'absolute',
          'z-50',
          'bg-white',
          'shadow-xl',
          'rounded-md',
          'py-1',
          'overflow-hidden'
        );
        popup.style.minWidth = '180px';

        items = props.items.map((item, index) => {
          const button = document.createElement('button');
          button.classList.add(
            'block',
            'w-full',
            'px-4',
            'py-2',
            'text-left',
            'hover:bg-gray-200'
          );
          button.textContent = item.title;
          button.addEventListener('click', () => {
            item.command(props);
            props.editor.commands.focus();
          });

          if (index === selectedIndex) {
            button.classList.add('bg-gray-200');
          }

          return button;
        });

        items.forEach((item) => popup.appendChild(item));

        document.body.appendChild(popup);

        const { left, bottom } = props.clientRect();
        popup.style.left = `${left}px`;
        popup.style.top = `${bottom}px`;

        document.addEventListener('keydown', onKeyDown);
      },

      onUpdate: (props) => {
        const { left, bottom } = props.clientRect();
        popup.style.left = `${left}px`;
        popup.style.top = `${bottom}px`;

        // Update items
        while (popup.firstChild) {
          popup.removeChild(popup.firstChild);
        }

        items = props.items.map((item, index) => {
          const button = document.createElement('button');
          button.classList.add(
            'block',
            'w-full',
            'px-4',
            'py-2',
            'text-left',
            'hover:bg-gray-200'
          );
          button.textContent = item.title;
          button.addEventListener('click', () => {
            item.command(props);
            props.editor.commands.focus();
          });

          if (index === selectedIndex) {
            button.classList.add('bg-gray-200');
          }

          return button;
        });

        items.forEach((item) => popup.appendChild(item));
      },

      onKeyDown: (props) => {
        if (props.event.key === 'Escape') {
          props.event.preventDefault();
          return true;
        }

        return false;
      },

      onExit: () => {
        popup.remove();
        document.removeEventListener('keydown', onKeyDown);
      }
    };
  }
});

