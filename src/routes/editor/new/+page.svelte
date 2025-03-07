<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';
  import Image from '@tiptap/extension-image';
  import Link from '@tiptap/extension-link';
  import Youtube from '@tiptap/extension-youtube';
  import TextAlign from '@tiptap/extension-text-align';
  import Placeholder from '@tiptap/extension-placeholder';
  import { marked } from 'marked';

  // Article data structure
  let article = {
    title: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: []
  };

  // Editor state
  let editor;
  let showPreview = false;
  let newTag = '';
  let imageUrl = '';
  let imageAlt = '';
  let imageWidth = '';
  let imageHeight = '';
  let linkUrl = '';
  let linkText = '';
  let youtubeUrl = '';
  let showImageModal = false;
  let showLinkModal = false;
  let showYoutubeModal = false;

  // Initialize editor on mount
  onMount(() => {
    editor = new Editor({
      element: document.querySelector('#editor'),
      extensions: [
        StarterKit,
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-primary underline',
          },
        }),
        Youtube.configure({
          width: 640,
          height: 480,
          controls: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
          placeholder: 'Start writing your article...',
        }),
      ],
      content: article.content,
      onUpdate: ({ editor }) => {
        article.content = editor.getHTML();
      },
    });
  });

  // Clean up on destroy
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });

  // Toolbar actions
  function toggleBold() {
    editor.chain().focus().toggleBold().run();
  }

  function toggleItalic() {
    editor.chain().focus().toggleItalic().run();
  }

  function toggleUnderline() {
    editor.chain().focus().toggleMark('underline').run();
  }

  function toggleHeading(level) {
    editor.chain().focus().toggleHeading({ level }).run();
  }

  function toggleBulletList() {
    editor.chain().focus().toggleBulletList().run();
  }

  function toggleOrderedList() {
    editor.chain().focus().toggleOrderedList().run();
  }

  function setTextAlign(align) {
    editor.chain().focus().setTextAlign(align).run();
  }

  function openImageModal() {
    showImageModal = true;
  }

  function insertImage() {
    if (imageUrl) {
      const attrs = { 
        src: imageUrl,
        alt: imageAlt,
      };
      
      if (imageWidth) attrs.width = imageWidth;
      if (imageHeight) attrs.height = imageHeight;
      
      editor.chain().focus().setImage(attrs).run();
      
      // Reset form
      imageUrl = '';
      imageAlt = '';
      imageWidth = '';
      imageHeight = '';
      showImageModal = false;
    }
  }

  function openLinkModal() {
    const { from, to } = editor.state.selection;
    linkText = editor.state.doc.textBetween(from, to, ' ');
    showLinkModal = true;
  }

  function insertLink() {
    if (linkUrl) {
      // If text is selected, update the link on that text
      if (editor.state.selection.content().size > 0) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: linkUrl })
          .run();
      } 
      // If no text is selected but linkText is provided, insert new text with link
      else if (linkText) {
        editor
          .chain()
          .focus()
          .insertContent(`<a href="${linkUrl}">${linkText}</a>`)
          .run();
      }
      
      // Reset form
      linkUrl = '';
      linkText = '';
      showLinkModal = false;
    }
  }

  function openYoutubeModal() {
    showYoutubeModal = true;
  }

  function insertYoutube() {
    if (youtubeUrl) {
      editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      
      // Reset form
      youtubeUrl = '';
      showYoutubeModal = false;
    }
  }

  function addTag() {
    if (newTag && !article.tags.includes(newTag)) {
      article.tags = [...article.tags, newTag];
      newTag = '';
    }
  }

  function removeTag(tag) {
    article.tags = article.tags.filter(t => t !== tag);
  }

  // Convert HTML to Markdown for preview
  function getMarkdownContent() {
    return article.content;
  }
</script>

<div class="container mx-auto p-4">
  <div class="flex flex-col gap-6">
    <!-- Article Title -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Article Title</span>
      </label>
      <input 
        type="text" 
        bind:value={article.title} 
        placeholder="Enter article title" 
        class="input input-bordered w-full"
      />
    </div>

    <!-- Article Excerpt -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Excerpt</span>
      </label>
      <textarea 
        bind:value={article.excerpt} 
        placeholder="Brief description of your article" 
        class="textarea textarea-bordered h-24"
      ></textarea>
    </div>

    <!-- Cover Image URL -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Cover Image URL</span>
      </label>
      <input 
        type="text" 
        bind:value={article.coverImage} 
        placeholder="https://example.com/image.jpg" 
        class="input input-bordered w-full"
      />
      {#if article.coverImage}
        <div class="mt-2">
          <img src={article.coverImage || "/placeholder.svg"} alt="Cover preview" class="max-h-40 rounded-lg" />
        </div>
      {/if}
    </div>

    <!-- Tags -->
    <div class="form-control w-full">
      <label for=""class="label">
        <span class="label-text text-lg font-bold">Tags</span>
      </label>
      <div class="flex flex-wrap gap-2 mb-2">
        {#each article.tags as tag}
          <div class="badge badge-primary gap-1">
            {tag}
            <button on:click={() => removeTag(tag)} class="btn btn-xs btn-circle">×</button>
          </div>
        {/each}
      </div>
      <div class="join w-full">
        <input 
          type="text" 
          bind:value={newTag} 
          placeholder="Add a tag" 
          class="input input-bordered join-item w-full"
        />
        <button on:click={addTag} class="btn join-item btn-primary">Add</button>
      </div>
    </div>

    <!-- Editor/Preview Toggle -->
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold">Article Content</h2>
      <div class="btn-group">
        <button 
          class="btn {!showPreview ? 'btn-active' : ''}" 
          on:click={() => showPreview = false}
        >
          Edit
        </button>
        <button 
          class="btn {showPreview ? 'btn-active' : ''}" 
          on:click={() => showPreview = true}
        >
          Preview
        </button>
      </div>
    </div>

    {#if !showPreview}
      <!-- Editor Toolbar -->
      <div class="bg-base-200 p-2 rounded-t-lg flex flex-wrap gap-2">
        <div class="btn-group">
          <button 
            class="btn btn-sm" 
            on:click={toggleBold} 
            class:btn-primary={editor?.isActive('bold')}
            title="Bold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={toggleItalic} 
            class:btn-primary={editor?.isActive('italic')}
            title="Italic"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={toggleUnderline} 
            class:btn-primary={editor?.isActive('underline')}
            title="Underline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>
          </button>
        </div>

        <div class="btn-group">
          <button 
            class="btn btn-sm" 
            on:click={() => toggleHeading(1)} 
            class:btn-primary={editor?.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            H1
          </button>
          <button 
            class="btn btn-sm" 
            on:click={() => toggleHeading(2)} 
            class:btn-primary={editor?.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            H2
          </button>
          <button 
            class="btn btn-sm" 
            on:click={() => toggleHeading(3)} 
            class:btn-primary={editor?.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div class="btn-group">
          <button 
            class="btn btn-sm" 
            on:click={toggleBulletList} 
            class:btn-primary={editor?.isActive('bulletList')}
            title="Bullet List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={toggleOrderedList} 
            class:btn-primary={editor?.isActive('orderedList')}
            title="Ordered List"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>
          </button>
        </div>

        <div class="btn-group">
          <button 
            class="btn btn-sm" 
            on:click={() => setTextAlign('left')} 
            class:btn-primary={editor?.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={() => setTextAlign('center')} 
            class:btn-primary={editor?.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={() => setTextAlign('right')} 
            class:btn-primary={editor?.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg>
          </button>
        </div>

        <div class="btn-group">
          <button 
            class="btn btn-sm" 
            on:click={openImageModal}
            title="Insert Image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={openLinkModal}
            title="Insert Link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </button>
          <button 
            class="btn btn-sm" 
            on:click={openYoutubeModal}
            title="Insert YouTube Video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </button>
        </div>
      </div>

      <!-- Editor Content -->
      <div class="border border-base-300 rounded-b-lg p-4 min-h-[400px]" id="editor"></div>
    {:else}
      <!-- Preview Content -->
      <div class="border border-base-300 rounded-lg p-4 min-h-[400px] prose max-w-none">
        {#if article.title}
          <h1>{article.title}</h1>
        {/if}
        
        {#if article.coverImage}
          <img src={article.coverImage || "/placeholder.svg"} alt={article.title} class="w-full max-h-80 object-cover rounded-lg mb-4" />
        {/if}
        
        {#if article.tags.length > 0}
          <div class="flex flex-wrap gap-2 mb-4 not-prose">
            {#each article.tags as tag}
              <span class="badge badge-primary">{tag}</span>
            {/each}
          </div>
        {/if}
        
        {#if article.excerpt}
          <p class="text-lg font-medium italic">{article.excerpt}</p>
          <hr class="my-4" />
        {/if}
        
        {@html article.content}
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2 mt-4">
      <button class="btn">Save Draft</button>
      <button class="btn btn-primary">Publish</button>
    </div>
  </div>
</div>

<!-- Image Modal -->
{#if showImageModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Insert Image</h3>
      <div class="form-control w-full mt-4">
        <label for=""class="label">
          <span class="label-text">Image URL</span>
        </label>
        <input type="text" bind:value={imageUrl} placeholder="https://example.com/image.jpg" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full mt-2">
        <label for=""class="label">
          <span class="label-text">Alt Text</span>
        </label>
        <input type="text" bind:value={imageAlt} placeholder="Image description" class="input input-bordered w-full" />
      </div>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <div class="form-control w-full">
          <label for=""class="label">
            <span class="label-text">Width (optional)</span>
          </label>
          <input type="text" bind:value={imageWidth} placeholder="e.g., 300px or 50%" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label for=""class="label">
            <span class="label-text">Height (optional)</span>
          </label>
          <input type="text" bind:value={imageHeight} placeholder="e.g., 200px" class="input input-bordered w-full" />
        </div>
      </div>
      <div class="modal-action">
        <button class="btn" on:click={() => showImageModal = false}>Cancel</button>
        <button class="btn btn-primary" on:click={insertImage}>Insert</button>
      </div>
    </div>
  </div>
{/if}

<!-- Link Modal -->
{#if showLinkModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Insert Link</h3>
      <div class="form-control w-full mt-4">
        <label for=""class="label">
          <span class="label-text">URL</span>
        </label>
        <input type="text" bind:value={linkUrl} placeholder="https://example.com" class="input input-bordered w-full" />
      </div>
      <div class="form-control w-full mt-2">
        <label for=""class="label">
          <span class="label-text">Text</span>
        </label>
        <input type="text" bind:value={linkText} placeholder="Link text" class="input input-bordered w-full" />
      </div>
      <div class="modal-action">
        <button class="btn" on:click={() => showLinkModal = false}>Cancel</button>
        <button class="btn btn-primary" on:click={insertLink}>Insert</button>
      </div>
    </div>
  </div>
{/if}

<!-- YouTube Modal -->
{#if showYoutubeModal}
  <div class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Insert YouTube Video</h3>
      <div class="form-control w-full mt-4">
        <label for="" class="label">
          <span class="label-text">YouTube URL</span>
        </label>
        <input type="text" bind:value={youtubeUrl} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="input input-bordered w-full" />
      </div>
      <div class="modal-action">
        <button class="btn" on:click={() => showYoutubeModal = false}>Cancel</button>
        <button class="btn btn-primary" on:click={insertYoutube}>Insert</button>
      </div>
    </div>
  </div>
{/if}
