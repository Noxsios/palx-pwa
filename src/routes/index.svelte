<script type="typescript">
  let color = "#07C";
  const handleChange = (e: Event) => {
    color = e.target.value;
    console.log(color);
  };
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input type="color" value={color} on:change={handleChange} />
