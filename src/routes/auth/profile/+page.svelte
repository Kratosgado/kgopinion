<script lang="ts">
	import { goto } from '$app/navigation';
	import { Loading, Status, auth, initialState, type AuthState, type Author } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	// State
	let editMode = $state(false);
	let isSaving = $state(false);
	let error : string = $state('');
	let success : string = $state('');

	// Form state (for editing)
	let editedAuthor: Author | undefined= $state(undefined);
	let newAvatarUrl = $state('');
	let authState: AuthState = $state(initialState);
	let unsubscribe: Unsubscriber;

  function setStatus({err, succ}: {err?: string; succ?: string}){
    error = err|| '';
    success = succ || '';
        setTimeout(() => {
    error = '';
    success = '';
  }, 8000);
  }

 	// Initialize authState!.user!.data
	onMount(async () => {
		unsubscribe = auth.subscribe((v) => {
			authState = v;
			if (!authState.isLoading && !authState.isAuthenticated) {
				const returnUrl = encodeURIComponent(window.location.pathname);
				goto(`/auth?returnUrl=${returnUrl}`);
			}

			editedAuthor = JSON.parse(JSON.stringify(authState.user));
		});

		onDestroy(() => unsubscribe && unsubscribe());
	});

	// Toggle edit mode
	function toggleEditMode() {
		if (editMode) {
			// Discard changes
			editedAuthor = JSON.parse(JSON.stringify(authState.user));
			newAvatarUrl = '';
		}

		editMode = !editMode;
    setStatus({})
	}

	// Save profile changes
	async function saveProfile() {
		if (!editedAuthor?.name || !editedAuthor.email) {
      setStatus({err: 'Name and email are required'})
			return;
		}

		isSaving = true;
		error = '';
		success = '';

		try {
			if (newAvatarUrl) {
				editedAuthor.avatar = newAvatarUrl;
			}

			await auth.updateProfile(editedAuthor);

      setStatus({succ:'Profile updated successfully'})

			editMode = false;
		} catch (err) {
			console.error(err);
      setStatus({err:'Failed to update profile. Please try again.'})
		} finally {
			isSaving = false;
		}
	}

	// Initialize social object if it doesn't exist
	function ensureSocialExists() {
		if (!editedAuthor!.social) {
			editedAuthor!.social = {};
		}
	}
</script>

<svelte:head>
	<title>My Profile - KgOpinion</title>
</svelte:head>

<div class="container mx-auto py-12 px-4">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-4xl font-bold">My Profile</h1>

		{#if !authState.isLoading && !editMode}
			<button class="btn btn-primary" onclick={toggleEditMode}> Edit Profile </button>
		{/if}
	</div>

  <Status {success} {error} />

	{#if authState.isLoading}
		<Loading />
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Profile Information -->
			<div class="lg:col-span-2">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						{#if editMode}
							<!-- Edit Mode -->
							<h2 class="card-title text-2xl mb-6">Edit Profile</h2>

							<form onsubmit={saveProfile} class="space-y-6">
								<!-- Basic Information -->
								<div class="space-y-4">
									<div class="form-control">
										<label class="label" for="name">
											<span class="label-text">Full Name</span>
										</label>
										<input
											type="text"
											id="name"
											bind:value={editedAuthor!.name}
											class="input input-bordered w-full"
											required
										/>
									</div>

									<div class="form-control">
										<label class="label" for="email">
											<span class="label-text">Email</span>
										</label>
										<input
											type="email"
											id="email"
											bind:value={editedAuthor!.email}
											class="input input-bordered w-full"
											required
										/>
									</div>

									<div class="form-control">
										<label class="label" for="bio">
											<span class="label-text">Bio</span>
										</label>
										<textarea
											id="bio"
											bind:value={editedAuthor!.bio}
											class="textarea textarea-bordered h-24 w-full"
											placeholder="Tell readers about yourself..."
										></textarea>
									</div>
								</div>

								<!-- Social Links -->
								<div>
									<h3 class="text-lg font-semibold mb-3">Social Media Links</h3>

									<div class="space-y-4">
										<div class="form-control">
											<label class="label" for="twitter">
												<span class="label-text">Twitter Username</span>
											</label>
											<div class="input-group">
												<span>@</span>
												<input
													type="text"
													id="twitter"
													onfocus={ensureSocialExists}
													bind:value={editedAuthor!.social!.twitter}
													class="input input-bordered w-full"
													placeholder="username"
												/>
											</div>
										</div>

										<div class="form-control">
											<label class="label" for="github">
												<span class="label-text">GitHub Username</span>
											</label>
											<div class="input-group">
												<span>github.com/</span>
												<input
													type="text"
													id="github"
													onfocus={ensureSocialExists}
													bind:value={editedAuthor!.social!.github}
													class="input input-bordered w-full"
													placeholder="username"
												/>
											</div>
										</div>

										<div class="form-control">
											<label class="label" for="linkedin">
												<span class="label-text">LinkedIn Username</span>
											</label>
											<div class="input-group">
												<span>linkedin.com/in/</span>
												<input
													type="text"
													id="linkedin"
													onfocus={ensureSocialExists}
													bind:value={editedAuthor!.social!.linkedIn}
													class="input input-bordered w-full"
													placeholder="username"
												/>
											</div>
										</div>
									</div>
								</div>

								<!-- Action Buttons -->
								<div class="flex justify-end gap-2 pt-4">
									<button
										type="button"
										class="btn btn-outline"
										onclick={toggleEditMode}
										disabled={isSaving}
									>
										Cancel
									</button>
									<button type="submit" class="btn btn-primary" disabled={isSaving}>
										{#if isSaving}
											<span class="loading loading-spinner loading-sm"></span>
											Saving...
										{:else}
											Save Changes
										{/if}
									</button>
								</div>
							</form>
						{:else}
							<!-- View Mode -->
							<h2 class="card-title text-2xl mb-6">Profile Information</h2>

							<div class="space-y-6">
								<div>
									<h3 class="text-lg font-semibold mb-2">Basic Information</h3>
									<div class="space-y-3">
										<div>
											<span class="text-gray-500">Name:</span>
											<span class="ml-2 font-medium">{authState!.user!.name}</span>
										</div>
										<div>
											<span class="text-gray-500">Email:</span>
											<span class="ml-2 font-medium">{authState!.user!.email}</span>
										</div>
										{#if authState!.user!.bio}
											<div>
												<span class="text-gray-500">Bio:</span>
												<p class="mt-1">{authState!.user!.bio}</p>
											</div>
										{/if}
									</div>
								</div>

								{#if authState!.user!.social}
									<div>
										<h3 class="text-lg font-semibold mb-2">Social Media</h3>
										<div class="flex flex-wrap gap-3">
											{#if authState!.user!.social.twitter}
												<a
													href={`https://twitter.com/${authState!.user!.social.twitter}`}
													target="_blank"
													rel="noopener noreferrer"
													class="btn btn-outline btn-sm gap-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														><path
															d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
														></path></svg
													>
													Twitter
												</a>
											{/if}

											{#if authState!.user!.social.github}
												<a
													href={`https://github.com/${authState!.user!.social.github}`}
													target="_blank"
													rel="noopener noreferrer"
													class="btn btn-outline btn-sm gap-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														><path
															d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
														></path></svg
													>
													GitHub
												</a>
											{/if}

											{#if authState!.user!.social.linkedIn}
												<a
													href={`https://linkedin.com/in/${authState!.user!.social.linkedIn}`}
													target="_blank"
													rel="noopener noreferrer"
													class="btn btn-outline btn-sm gap-2"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														><path
															d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
														></path><rect x="2" y="9" width="4" height="12"></rect><circle
															cx="4"
															cy="4"
															r="2"
														></circle></svg
													>
													LinkedIn
												</a>
											{/if}
										</div>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Avatar Section -->
			<div>
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body items-center text-center">
						<h2 class="card-title text-xl mb-4">Profile Picture</h2>

						<div class="avatar mb-4">
							<div class="w-32 h-32 rounded-full">
								<img
									src={editMode && newAvatarUrl ? newAvatarUrl : authState!.user!.avatar}
									alt={authState.user!.name}
								/>
							</div>
						</div>

						{#if editMode}
							<div class="form-control w-full">
								<label class="label" for="avatarUrl">
									<span class="label-text">Avatar URL</span>
								</label>
								<input
									type="text"
									id="avatarUrl"
									bind:value={newAvatarUrl}
									placeholder="https://example.com/avatar.jpg"
									class="input input-bordered w-full"
								/>
								<label for="" class="label">
									<span class="label-text-alt">Enter a URL for your profile picture</span>
								</label>
							</div>

							<div class="divider">OR</div>

							<div class="form-control w-full">
								<label class="label" for="avatarFile">
									<span class="label-text">Upload Image</span>
								</label>
								<input
									type="file"
									id="avatarFile"
									accept="image/*"
									class="file-input file-input-bordered w-full"
								/>
								<label for="" class="label">
									<span class="label-text-alt">Max size: 2MB</span>
								</label>
							</div>
						{/if}
					</div>
				</div>

				{#if !editMode}
					<div class="card bg-base-100 shadow-xl mt-6">
						<div class="card-body">
							<h2 class="card-title text-xl mb-2">Account Settings</h2>
							<div class="space-y-3">
								<button class="btn btn-outline btn-block justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mr-2"
										><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path
											d="M7 11V7a5 5 0 0 1 10 0v4"
										></path></svg
									>
									Change Password
								</button>
								<button class="btn btn-outline btn-block justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mr-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg
									>
									Privacy Settings
								</button>
								<button class="btn btn-outline btn-block justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="mr-2"
										><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path
											d="M13.73 21a2 2 0 0 1-3.46 0"
										></path></svg
									>
									Notification Preferences
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<!-- Public Profile Preview -->
		{#if !editMode}
			<div class="mt-12">
				<h2 class="text-2xl font-bold mb-6">Public Profile Preview</h2>
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
							<div class="avatar">
								<div class="w-24 h-24 rounded-full">
									<img
										src={authState!.user!.avatar || '/placeholder.svg'}
										alt={authState.user!.name}
									/>
								</div>
							</div>

							<div class="flex-1">
								<h3 class="text-xl font-bold">{authState!.user!.name}</h3>
								{#if authState!.user!.bio}
									<p class="mt-2">{authState!.user!.bio}</p>
								{/if}

								{#if authState!.user!.social}
									<div class="flex gap-3 mt-4">
										{#if authState!.user!.social.twitter}
											<a
												aria-label="twitter"
												href={`https://twitter.com/${authState!.user!.social.twitter}`}
												target="_blank"
												rel="noopener noreferrer"
												class="btn btn-circle btn-sm btn-ghost"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													><path
														d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
													></path></svg
												>
											</a>
										{/if}

										{#if authState!.user!.social.github}
											<a
												aria-label="twitter"
												href={`https://github.com/${authState!.user!.social.github}`}
												target="_blank"
												rel="noopener noreferrer"
												class="btn btn-circle btn-sm btn-ghost"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													><path
														d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
													></path></svg
												>
											</a>
										{/if}

										{#if authState!.user!.social.linkedIn}
											<a
												href={`https://linkedin.com/in/${authState!.user!.social.linkedIn}`}
												aria-label="twitter"
												target="_blank"
												rel="noopener noreferrer"
												class="btn btn-circle btn-sm btn-ghost"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
													><path
														d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
													></path><rect x="2" y="9" width="4" height="12"></rect><circle
														cx="4"
														cy="4"
														r="2"
													></circle></svg
												>
											</a>
										{/if}
									</div>
								{/if}
							</div>
						</div>

						<div class="divider"></div>

						<div>
							<h4 class="font-semibold mb-2">Recent Articles</h4>
							<p class="text-gray-500 italic">
								This is where your published articles will appear to readers.
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
