<script lang="ts">
  let {title, cb, class: color}: {title: string; class?: string; cb?: () => void} = $props()
</script>

<button class='btn {color}' onclick={cb}>{title}</button>
