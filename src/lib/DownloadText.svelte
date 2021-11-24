<script>
  import { onMount } from "svelte";

  import ColorBox from "./ColorBox.svelte";

  export let title;
  export let content;
  export let fileOptions;

  let isSupported = true;

  async function getNewFileHandle() {
    const options = fileOptions;

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
      });
    });
  };

  onMount(() => {
    if (!window.FileSystemWritableFileStream) {
      isSupported = false;
      title = "File System API not supported";
      content = "Your browser does not support the File System API.";
    }
  });
</script>

{#if isSupported === false}
  <small class="mx-2 underline text-blue-500">
    <a href="https://caniuse.com/fileapi">File System API not supported</a></small
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
