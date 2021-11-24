<script>
  export let title;
  export let content;

  async function getNewFileHandle() {
    const options = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"]
          }
        }
      ]
    };
    // @ts-ignore
    const handle = await navigator.showSaveFilePicker(options);
    console.log(handle);
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
        console.log("File saved!");
      });
    });
  };
</script>

<button
  on:click={save}
  class="text-purple-100 hover:underline hover:ring-4 ring-purple-400 rounded-md bg-indigo-600 p-2 flex transition-all"
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
