<script type="typescript">
  import palx from "palx";
  import Footer from "$lib/Footer.svelte";
  import ColorBox from "$lib/ColorBox.svelte";

  let color = "#ffbc00";

  const handleChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    if (val.match(/^#[0-9A-Fa-f]{6}$/i)) {
      color = val;
    }
  };

  $: console.log(`Current base color: ${color}`);
  $: palette = Object.entries(palx(color))
    .map(([key, value]) => ({
      name: key,
      values: value
    }))
    .filter((ele) => Array.isArray(ele.values));
</script>

<main class="flex flex-col items-center justify-center mb-20 mt-4">
  <section id="title-section">
    <h1 class="text-2xl my-2">palx-pwa</h1>
    <h2 class="text-xl capitalize my-1 text-gray-700">:: Automatic UI color palette generator</h2>
    <h2 class="text-md text-gray-500">:: Now with the powers of PWA and Svelte</h2>
    <small>Credit to <a class="text-blue-600 underline" href="https://github.com/jxnblk/palx">jxnblk/palx</a></small>
  </section>

  <section id="color-picker-section" class="flex mt-4">
    <input
      id="picker"
      type="color"
      class="p-0.5 h-10 mr-3 cursor-pointer"
      bind:value={color}
      on:change={handleChange}
      required
    />
    <input type="search" spellcheck="false" class="border rounded-md p-2" bind:value={color} on:change={handleChange} />
  </section>

  {#each palette as colors}
    <section id={colors.name + "-section"} class="mt-4 flex flex-col items-center justify-center mb-4 mx-2">
      <h3 class="text-xl my-2">{colors.name}</h3>
      <div class="flex flex-row items-center justify-center flex-wrap">
        {#each colors.values as bgColor, index}
          <ColorBox bg={bgColor} base={colors.name} {index} />
        {/each}
      </div>
    </section>
  {/each}
</main>
<Footer />
