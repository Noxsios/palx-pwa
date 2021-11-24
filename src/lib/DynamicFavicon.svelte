<script>
  import { Canvas, Layer, t } from "svelte-canvas";
  export let color;
  let href;

  $: render = ({ context, width, height }) => {
    // https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x + r, y);
      this.arcTo(x + w, y, x + w, y + h, r);
      this.arcTo(x + w, y + h, x, y + h, r);
      this.arcTo(x, y + h, x, y, r);
      this.arcTo(x, y, x + w, y, r);
      this.closePath();
      return this;
    };
    context.fillStyle = color;
    context.roundRect(0, 0, width, height, 10).fill();

    context.font = "52px Fira Sans";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText("p", width / 2, height / 2 + 7);

    href = context.canvas.toDataURL();
  };
</script>

<svelte:head>
  <!-- <link rel="icon" href="/favicon.ico" /> -->
  <link rel="icon" type="image/png" sizes="64x64" {href} />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <!-- <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> -->
  <!-- <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> -->
</svelte:head>

<Canvas width={64} height={64} autoclear style="display: none;">
  <Layer {render} />
</Canvas>
