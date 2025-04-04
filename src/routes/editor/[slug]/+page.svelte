<script lang="ts">
	import { auth, Status, type Post } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/motion';
	import Details from './Details.svelte';
	import EditorPage from './EditorPage.svelte';
	import Preview from './Preview.svelte';
	import { post } from './post.svelte';
	import { extra } from './extra.svelte';

	let showPreview = false;
	let unsubscribe: Unsubscriber;
	export let data: { edit: Post };
  
  const edit = data.edit;
    post.slug = edit.slug;
    post.title = edit.slug;
    post.authorId = edit.authorId;
    post.author = edit.author;
    post.content = edit.content;
    post.createdAt = edit.createdAt;
    post.published = edit.published;
    post.publishedAt = edit.publishedAt;
    post.updatedAt= edit.updatedAt;
    post.excerpt = edit.excerpt;
    post.keywords = edit.keywords;
    post.categories = edit.categories;
    post.featuredImage = edit.featuredImage;
    post.relatedPosts = edit.relatedPosts || [];
    post.readTime = edit.readTime || 0;
    post.likeCount = edit.likeCount || 0
    post.commentCount = edit.commentCount || 0;

	onMount(async () => {
		unsubscribe = auth.subscribe((v) => {
			post.author = v.user!;
			post.authorId = v.user!.id;
		});
		onDestroy(() => unsubscribe && unsubscribe());
	});
</script>

<div class="min-h-screen bg-base-300 p-4">
    <Status success={extra.success} error={extra.error} />
	<div class="flex flex-row justify-center gap-4">
		<!-- <Elements /> -->
		{#if showPreview}
			<Preview togglePreview={() => (showPreview = !showPreview)} />
		{:else}
			<div>
				<EditorPage />
			</div>
			<Details togglePreview={() => (showPreview = !showPreview)} />
		{/if}
	</div>
</div>
