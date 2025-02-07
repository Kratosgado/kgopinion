<script lang="ts">
	import { post } from './post.svelte.ts';
	import PostView from '../blog/+page.svelte';
	let { togglePreview }: { togglePreview: Function } = $props();
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
	<div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-bold">Post Preview</h2>
			<button onclick={() => togglePreview()} class="text-gray-500 hover:text-gray-700">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<div class="prose">
			<PostView {post} />
			{@html post.content}
		</div>
	</div>
</div>
