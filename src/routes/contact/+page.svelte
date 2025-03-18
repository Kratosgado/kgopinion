<script lang="ts">
	import { emailAddress, SEO, type SEOMetadata } from '$lib';

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let submitting = false;
	let success = false;
	let error = '';

	async function handleSubmit() {
		if (!name || !email || !message) {
			error = 'Please fill in all required fields.';
			return;
		}

		submitting = true;
		error = '';

		try {
			// In a real app, you would send the form data to your API
			// await fetch('/api/contact', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ name, email, subject, message })
			// });

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			success = true;
			name = '';
			email = '';
			subject = '';
			message = '';
		} catch (err) {
			error = 'An error occurred. Please try again later.';
			console.error(err);
		} finally {
			submitting = false;
		}
	}
  const metadata: SEOMetadata = {
    title: "Contact Us - KgOpinion",
    description: "Get in touch with the us",
    keywords: ['KgOpinion', 'contact', 'developer']
  }
</script>

<SEO {metadata} />

<div class="container mx-auto py-12 px-4">
	<h1 class="text-4xl font-bold mb-8">Contact Us</h1>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
		<div>
			<div class="prose lg:prose-xl max-w-none">
				<p>
					Have questions, suggestions, or just want to say hello? We'd love to hear from you! Fill
					out the form, and we'll get back to you as soon as possible.
				</p>

				<h3>Get in Touch</h3>
				<p>You can also reach us through the following channels:</p>

				<div class="not-prose">
					<div class="flex items-center gap-4 mb-4">
						<div class="bg-primary text-primary-content p-3 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
								></path><polyline points="22,6 12,13 2,6"></polyline></svg
							>
						</div>
						<div>
							<h4 class="text-lg font-bold">Email</h4>
							<p class="text-gray-600">{emailAddress}</p>
						</div>
					</div>

					<div class="flex items-center gap-4 mb-4">
						<div class="bg-primary text-primary-content p-3 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path
									d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
								></path></svg
							>
						</div>
						<div>
							<h4 class="text-lg font-bold">Phone</h4>
							<p class="text-gray-600">+233-599-239-271</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div>
			{#if success}
				<div class="bg-success text-success-content p-6 rounded-lg">
					<h3 class="text-xl font-bold mb-2">Message Sent!</h3>
					<p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
					<button class="btn btn-sm mt-4" on:click={() => (success = false)}
						>Send Another Message</button
					>
				</div>
			{:else}
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">Send Us a Message</h2>

						{#if error}
							<div class="alert alert-error mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/></svg
								>
								<span>{error}</span>
							</div>
						{/if}

						<form on:submit|preventDefault={handleSubmit} class="space-y-4">
							<div class="form-control">
								<label class="label" for="name">
									<span class="label-text">Name *</span>
								</label>
								<input
									type="text"
									id="name"
									bind:value={name}
									required
									class="input input-bordered w-full"
								/>
							</div>

							<div class="form-control">
								<label class="label" for="email">
									<span class="label-text">Email *</span>
								</label>
								<input
									type="email"
									id="email"
									bind:value={email}
									required
									class="input input-bordered w-full"
								/>
							</div>

							<div class="form-control">
								<label class="label" for="subject">
									<span class="label-text">Subject</span>
								</label>
								<input
									type="text"
									id="subject"
									bind:value={subject}
									class="input input-bordered w-full"
								/>
							</div>

							<div class="form-control">
								<label class="label" for="message">
									<span class="label-text">Message *</span>
								</label>
								<textarea
									id="message"
									bind:value={message}
									required
									rows="5"
									class="textarea textarea-bordered w-full"
								></textarea>
							</div>

							<div class="form-control mt-6">
								<button type="submit" class="btn btn-primary" disabled={submitting}>
									{#if submitting}
										<span class="loading loading-spinner loading-sm"></span>
										Sending...
									{:else}
										Send Message
									{/if}
								</button>
							</div>
						</form>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
