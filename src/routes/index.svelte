<script type="typescript">
  import palx from "palx";
  import Footer from "$lib/Footer.svelte";
  import ColorBox from "$lib/ColorBox.svelte";
  import DynamicFavicon from "$lib/DynamicFavicon.svelte";
  import DownloadText from "$lib/DownloadText.svelte";

  let color = "#ffbc00";

  const handleChange = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;

    if (val.length === 0 || val.length > 7) {
      return;
    } else if (val.match(/^#[0-9a-f]{3}$/i)) {
      // handle hex shorthand
      color =
        "#" +
        val
          .split("")
          .slice(1)
          .map((char) => char.repeat(2))
          .join("");
    } else if (val.match(/^#[0-9A-Fa-f]{1,6}$/i)) {
      color = val.padEnd(7, "0");
    } else if (val.match(/^#[0-9A-Fa-f]{6}$/i)) {
      color = val;
    }
  };

  $: colors = palx(color);
  $: console.log(`%cCurrent base color: ${color}`, `color: ${color}`);
  $: palette = Object.entries(colors)
    .map(([key, value]) => ({
      name: key,
      values: value
    }))
    .filter((ele) => Array.isArray(ele.values));
  $: jsonPalette = JSON.stringify(colors);
  $: cssRootVars = Object.entries(colors)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((color, idx) => {
          if (idx === 0) idx = 0.5;
          return `--color-${key}-${idx * 100}: ${color};`;
        });
      } else {
        return `--color-${key}: ${value};`;
      }
    })
    .flat()
    .join("");
  $: tailwindPalette = JSON.stringify(
    Object.entries(colors)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return {
            [key]: value.reduce((prev, color, idx) => {
              if (idx === 0) idx = 0.5;
              return { ...prev, [idx * 100]: color };
            }, {})
          };
        } else {
          return;
        }
      })
      .filter(Boolean)
      .reduce((prev, curr) => ({ ...prev, ...curr }), {})
  );
</script>

<svelte:head>
  <title>palx-pwa</title>
</svelte:head>

<DynamicFavicon bind:color />

<main class="flex flex-col items-center justify-center mb-20 mt-4">
  <section id="title-section">
    <h1 class="text-2xl my-2">palx-pwa</h1>
    <h2 class="text-xl capitalize my-1 text-gray-700">:: Automatic UI color palette generator</h2>
    <h2 class="text-md text-gray-500">:: Now with the powers of a PWA and Svelte</h2>
    <small>Credit to <a class="text-blue-600 underline" href="https://github.com/jxnblk/palx">jxnblk/palx</a></small>
  </section>

  <section id="color-picker-section" class="flex mt-4">
    <input
      id="picker"
      type="color"
      class="p-0.5 h-10 mr-3 cursor-pointer shadow rounded-md"
      value={color}
      on:change={handleChange}
      required
    />
    <input type="search" spellcheck="false" class="border rounded-md p-2 shadow" value={color} on:blur={handleChange} />
  </section>

  <section id="download-section" class="flex mt-4">
    <DownloadText
      title="JSON"
      content={jsonPalette}
      fileOptions={{
        suggestedName: `palx-${color.slice(1)}.json`,
        types: [
          {
            description: "JSON",
            accept: {
              "text/plain": [".json"]
            }
          }
        ]
      }}
    />
    <DownloadText
      title="CSS"
      content={":root {" + cssRootVars + "}"}
      fileOptions={{
        suggestedName: `palx-${color.slice(1)}.css`,
        types: [
          {
            description: "CSS",
            accept: {
              "text/plain": [".css"]
            }
          }
        ]
      }}
    />
    <DownloadText
      title="Tailwind"
      content={tailwindPalette}
      fileOptions={{
        suggestedName: `palx-${color.slice(1)}_tw_colors.js`,
        types: [
          {
            description: "Tailwind theme extension",
            accept: {
              "text/plain": [".js"]
            }
          }
        ]
      }}
    />
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
