<script>
	import Editor from '@tinymce/tinymce-svelte';
	let conf = {
		height: 500,
		menubar: false,
		plugins: [
			'advlist',
			'autolink',
			'lists',
			'link',
			'image',
			'charmap',
			'anchor',
			'searchreplace',
			'visualblocks',
			'code',
			'fullscreen',
			'insertdatetime',
			'media',
			'table',
			'preview',
			'help',
			'wordcount'
		],
		toolbar:
			'undo redo | blocks | ' +
			'bold italic forecolor | alignleft aligncenter ' +
			'alignright alignjustify | bullist numlist outdent indent | ' +
			'removeformat | help'
	};
</script>

<main>
	<h1>Hello Tiny</h1>
	<Editor
		apiKey="6qn93tppulc7n0vwfbbcrijia3xg3zsq974jjt80eeznr550"
		channel="7"
		value="<p>This is the initial content of the editor.</p>"
		{conf}
	/>
</main>
