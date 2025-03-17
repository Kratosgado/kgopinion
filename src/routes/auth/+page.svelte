<!-- src/routes/auth/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, type AuthState } from '$lib';
	import { onDestroy } from 'svelte';
	
  
  // Form state
  let email = '';
  let password = '';
  let rememberMe = false;
  let error = '';
  let isRegistering = false;
  
  let authState: AuthState | null = null
  const unsubscribe = auth.subscribe(v => { authState = v});
  // For registration
  let name = '';
  let confirmPassword = '';

   // Handle form submission
  async function handleSubmit() {
    if (!email || !password) {
      error = 'Please fill in all required fields';
      return;
    }
    
    if (isRegistering && password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }
     
     if( await auth.signIn(email, password))
      goto('/dashboard');
  }
  onDestroy(unsubscribe)
  

// Handle password reset request
  async function resetPassword() {
    if (!email) {
      error = 'Please enter your email address';
      return;
    }
    
    // authState?.isLoading = true;
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Password reset email sent. Please check your inbox.');
    } catch (err) {
      console.error(err);
      error = 'Failed to send password reset email. Please try again.';
    } finally {
      // authState?.isLoading = false;
    }
  }
	
  // Toggle between login and registration
  function toggleMode() {
    isRegistering = !isRegistering;
    error = '';
  }
  
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl font-bold text-center mx-auto mb-2">
        {isRegistering ? 'Create Account' : 'Welcome Back'}
      </h2>
      <p class="text-center text-gray-500 mb-6">
        {isRegistering 
          ? 'Create an account to start publishing your articles' 
          : 'Sign in to access your dashboard and manage your content'}
      </p>
      
      {#if error}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      {/if}
      
      <!-- Google Sign In Button -->
      <button 
        class="btn btn-outline w-full mb-4 gap-2" 
        on:click={auth.signInWithGoogle}
        disabled={authState?.isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
        </svg>
        Continue with Google
      </button>
      
      <div class="divider">OR</div>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        {#if isRegistering}
          <!-- Name field (only for registration) -->
          <div class="form-control">
            <label class="label" for="name">
              <span class="label-text">Full Name</span>
            </label>
            <input 
              type="text" 
              id="name"
              bind:value={name} 
              placeholder="John Doe" 
              class="input input-bordered w-full" 
              required
            />
          </div>
        {/if}
        
        <!-- Email field -->
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input 
            type="email" 
            id="email"
            bind:value={email} 
            placeholder="your@email.com" 
            class="input input-bordered w-full" 
            required
          />
        </div>
        
        <!-- Password field -->
        <div class="form-control">
          <label class="label" for="password">
            <span class="label-text">Password</span>
            {#if !isRegistering}
              <button 
                type="button" 
                class="label-text-alt link link-hover" 
                on:click={resetPassword}
                disabled={authState?.isLoading}
              >
                Forgot password?
              </button>
            {/if}
          </label>
          <input 
            type="password" 
            id="password"
            bind:value={password} 
            placeholder="••••••••" 
            class="input input-bordered w-full" 
            required
          />
        </div>
        
        {#if isRegistering}
          <!-- Confirm Password field (only for registration) -->
          <div class="form-control">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm Password</span>
            </label>
            <input 
              type="password" 
              id="confirmPassword"
              bind:value={confirmPassword} 
              placeholder="••••••••" 
              class="input input-bordered w-full" 
              required
            />
          </div>
        {/if}
        
        {#if !isRegistering}
          <!-- Remember me checkbox (only for login) -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-2">
              <input type="checkbox" bind:checked={rememberMe} class="checkbox checkbox-sm" />
              <span class="label-text">Remember me</span>
            </label>
          </div>
        {/if}
        
        <!-- Submit button -->
        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-primary w-full" 
            disabled={authState?.isLoading}
          >
            {#if authState?.isLoading}
              <span class="loading loading-spinner loading-sm"></span>
            {/if}
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <!-- Toggle between login and registration -->
      <div class="text-center mt-4">
        <p>
          {isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}
          <button 
            type="button" 
            class="link link-primary" 
            on:click={toggleMode}
            disabled={authState?.isLoading}
          >
            {isRegistering ? 'Sign In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  </div>
</div>
