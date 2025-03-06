<script lang="ts">
  let name = '';
  let email = '';
  let message = '';

  function handleSubmit() {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message. We will get back to you soon!');
    // Reset form fields
    name = '';
    email = '';
    message = '';
  }
</script>

<svelte:head>
  <title>Contact Us - BlogFolio</title>
</svelte:head>

<div class="container mx-auto py-12 px-4">
  <h1 class="text-4xl font-bold mb-8">Contact Us</h1>
  
  <div class="max-w-2xl mx-auto">
    <p class="mb-8">Have questions, suggestions, or just want to say hello? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.</p>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <div>
        <label for="name" class="block text-md font-medium ">Name</label>
        <input type="text" id="name" bind:value={name} required class="input input-bordered w-full" />
      </div>
      
      <div>
        <label for="email" class="block text-md font-medium ">Email</label>
        <input type="email" id="email" bind:value={email} required class="input input-bordered w-full" />
      </div>
      
      <div>
        <label for="message" class="block text-md font-medium">Message</label>
        <textarea id="message" bind:value={message} rows="5" required class="input input-bordered w-full min-h-40"></textarea>
      </div>
      
      <div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </div>
    </form>
  </div>
</div>
