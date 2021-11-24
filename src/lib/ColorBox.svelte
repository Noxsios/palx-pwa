<script>
  import { toast } from "@zerodevx/svelte-toast";

  export let base;
  export let bg;
  export let index;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(bg);

    toast.push(`Copied ${bg}`, {
      theme: {
        "--toastBarBackground": "var(--color-green-600)",
        "--toastBackground": `${bg}`,
        "--toastColor": `var(--color-gray-${index < 7 ? 700 : 100})`
      }
    });
  };
</script>

<div class="m-2 cursor-pointer hover:scale-110 transition-all" on:click={copyToClipboard}>
  <div class="rounded-md h-20 w-40 shadow-lg" style="background-color: {bg};" />
  <div class="flex mt-1">
    <strong class="text-xs text-gray-800 flex-1">{base} {index}</strong>
    <p class="text-xs uppercase text-gray-800">{bg}</p>
  </div>
</div>
