<script lang="ts">
  import '../app.css'
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  
  // Auth state (in a real app, this would come from your auth store)
  let isAuthenticated = false;
  let currentUser = null;
  let isLoading = true;
  
  // Check if the current route should show the navbar
  const showNavbar = !page.url.pathname.startsWith('/login');
  
  onMount(async () => {
    // In a real app, you would check if the user is authenticated
    // For example:
    // const user = await checkAuthState();
    // isAuthenticated = !!user;
    // currentUser = user;
    
    // Simulate auth check
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, we'll assume the user is authenticated on certain routes
    isAuthenticated = !page.url.pathname.startsWith('/login');
    
    if (isAuthenticated) {
      currentUser = {
        id: "author1",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://i.pravatar.cc/150?u=jane"
      };
    }
    
    isLoading = false;
  });
  
  function signOut() {
    // In a real app, you would sign the user out
    // For example:
    // await signOutUser();
    
    // Redirect to login page
    window.location.href = '/login';
  }
</script>

<!-- Global styles -->
<svelte:head>
  <title>KgOpinion</title>
  <meta name="description" content="A platform for bloggers and content creators" />
</svelte:head>

{#if showNavbar}
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <div class="w-full navbar bg-base-300">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div class="flex-1 px-2 mx-2">
          <a href="/" class="text-xl font-bold">KgOpinion</a>
        </div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <!-- Public navigation -->
            <li><a href="/" class:active={page.url.pathname === '/'}>Home</a></li>
            <li><a href="/articles" class:active={page.url.pathname === '/articles'}>Articles</a></li>
            <li><a href="/articles/categories" class:active={page.url.pathname === '/articles/categories'}>Categories</a></li>
            <li><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
            <li><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>
            
            <!-- Authenticated navigation -->
            {#if isAuthenticated && currentUser}
              <li>
                <details>
                  <summary>
                    <div class="avatar">
                      <div class="w-8 h-8 rounded-full">
                        <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                      </div>
                    </div>
                  </summary>
                  <ul class="p-2 bg-base-100 rounded-t-none">
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="/edit">New Post</a></li>
                    <li><a onclick={signOut}>Sign Out</a></li>
                  </ul>
                </details>
              </li>
            {:else if !isLoading}
              <li><a href="/login" class="btn btn-primary">Sign In</a></li>
            {/if}
          </ul>
        </div>
      </div>
      
      <!-- Page content -->
      <slot />
      
      <!-- Footer -->
      <footer class="footer p-10 bg-base-300 text-base-content mt-auto">
        <div>
          <span class="footer-title">KgOpinion</span> 
          <p class="max-w-xs">A platform for bloggers and content creators to share their knowledge and insights.</p>
        </div> 
        <div>
          <span class="footer-title">Company</span> 
          <a href="/about" class="link link-hover">About</a> 
          <a href="/contact" class="link link-hover">Contact</a> 
          <a href="/terms" class="link link-hover">Terms of Service</a> 
          <a href="/privacy" class="link link-hover">Privacy Policy</a>
        </div> 
        <div>
          <span class="footer-title">Explore</span> 
          <a href="/articles" class="link link-hover">Articles</a> 
          <a href="/articles/categories" class="link link-hover">Categories</a> 
          <a href="/authors" class="link link-hover">Authors</a> 
          <a href="/tags" class="link link-hover">Tags</a>
        </div> 
        <div>
          <span class="footer-title">Social</span> 
          <div class="grid grid-flow-col gap-4">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
          </div>
        </div>
      </footer>
    </div> 
    
    <!-- Mobile drawer -->
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-80 h-full bg-base-200">
        <!-- Mobile navigation -->
        <li><a href="/" class:active={page.url.pathname === '/'}>Home</a></li>
        <li><a href="/articles" class:active={page.url.pathname === '/articles'}>Articles</a></li>
        <li><a href="/articles/categories" class:active={page.url.pathname === '/articles/categories'}>Categories</a></li>
        <li><a href="/about" class:active={page.url.pathname === '/about'}>About</a></li>
        <li><a href="/contact" class:active={page.url.pathname === '/contact'}>Contact</a></li>
        
        <!-- Divider -->
        <div class="divider"></div>
        
        <!-- Authenticated navigation for mobile -->
        {#if isAuthenticated && currentUser}
          <li class="menu-title">
            <div class="flex items-center gap-2">
              <div class="avatar">
                <div class="w-8 h-8 rounded-full">
                  <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                </div>
              </div>
              <span>{currentUser.name}</span>
            </div>
          </li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/profile">My Profile</a></li>
          <li><a href="/edit">New Post</a></li>
          <li><a onclick={signOut}>Sign Out</a></li>
        {:else if !isLoading}
          <li><a href="/login" class="btn btn-primary justify-start">Sign In</a></li>
        {/if}
      </ul>
    </div>
  </div>
{:else}
  <!-- For login page, just render the content without navbar -->
  <slot />
{/if}
<style>
  :global(html, body) {
    height: 100%;
  }
  
  :global(body) {
    display: flex;
    flex-direction: column;
  }
  
  :global(#app) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
