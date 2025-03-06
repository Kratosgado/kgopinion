<script lang="ts">
  // This would typically come from your backend or store
  const categories = [
    { name: "Development", count: 12, color: "primary" },
    { name: "Design", count: 8, color: "secondary" },
    { name: "Performance", count: 5, color: "accent" },
    { name: "DevOps", count: 7, color: "info" },
    { name: "Career", count: 9, color: "success" },
    { name: "Artificial Intelligence", count: 6, color: "warning" },
    { name: "Blockchain", count: 4, color: "error" },
    { name: "Cybersecurity", count: 3, color: "primary" },
  ];
</script>

<svelte:head>
  <title>Categories - BlogFolio</title>
</svelte:head>

<div class="container mx-auto py-12 px-4">
  <h1 class="text-4xl font-bold mb-8">Categories</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each categories as category}
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-2xl">{category.name}</h2>
          <p>{category.count} articles</p>
          <div class="card-actions justify-end">
            <button class="btn btn-{category.color}">View Articles</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
