<script>
  import { onMount } from "svelte";
  export const ssr = false;

  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  export let title;
  export let content;
  export let fileOptions;

  let isSupported = true;

  async function getNewFileHandle() {
    const options = fileOptions;

    // @ts-ignore
    const handle = await window.showSaveFilePicker(options);
    // console.log(handle);
    return handle;
  }

  async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  const save = () => {
    getNewFileHandle().then((handle) => {
      writeFile(handle, content).then(() => {
        console.log(handle.name + " saved!");
        toast.push(handle.name + " saved!", {
          theme: {
            "--toastBackground": "var(--color-green-500)",
            "--toastBarBackground": "var(--color-green-600)"
          }
        });
      });
    });
  };

  onMount(() => {
    // @ts-ignore
    if (!window.showSaveFilePicker) {
      isSupported = false;
    }
  });
</script>

{#if isSupported === false}
  <!-- svelte-ignore missing-declaration -->
  <a
    href={URL.createObjectURL(new Blob([content], { type: "text/plain" }))}
    download={fileOptions.suggestedName}
    class="text-purple-100 mx-2 hover:underline hover:ring-4 ring-purple-400 rounded-md bg-indigo-600 p-2 transition-all"
  >
    <span>{title}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 inline-block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg></a
  >
{:else}
  <button
    on:click={save}
    class="text-purple-100 mx-2 hover:underline hover:ring-4 ring-purple-400 rounded-md bg-indigo-600 p-2 transition-all"
  >
    <span>{title}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 inline-block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  </button>
{/if}

<SvelteToast />
