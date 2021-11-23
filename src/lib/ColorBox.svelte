<script>
  export let base;
  export let bg;
  export let index;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bg);
  };
</script>

<div class="m-2 cursor-pointer" on:click={copyToClipboard}>
  <div class="rounded-md h-20 w-40 shadow-lg" style="background-color: {bg};" />
  <div class="flex mt-1">
    <strong class="text-xs text-gray-800 flex-1">{base} {index}</strong>
    <p class="text-xs uppercase text-gray-800">{bg}</p>
  </div>
</div>
