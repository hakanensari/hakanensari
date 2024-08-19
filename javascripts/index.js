const CANVAS_WIDTH = 270;
const MARGIN_BOTTOM = 16;
const MAX_SLICES = 180;
const SLICE_INTERVAL_MAX = 180;

const isRetina = window.devicePixelRatio > 1;
const images = isRetina
  ? ["images/index/thumbnails/IMG_3565@2x.jpg"]
  : ["images/index/thumbnails/IMG_3565.jpg"];
const image = new Image();

image.src = images[Math.floor(Math.random() * images.length)];
image.onload = () => {
  const canvas = document.createElement("canvas");
  const link = document.createElement("a");
  link.href = image.src;
  link.append(canvas);
  document.querySelector("#images").append(link);
  const context = canvas.getContext("2d");

  const multiply = () => {
    const aspectRatio = image.height / image.width;
    canvas.width = CANVAS_WIDTH;
    canvas.height = canvas.width * aspectRatio;
    canvas.style.marginBottom = `${MARGIN_BOTTOM}px`;

    const count = Math.ceil(Math.random() * MAX_SLICES);
    const slices = [];
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const width = canvas.width / count;
    const indices = [...Array(count).keys()];

    while (indices.length !== 0) {
      const index = indices.splice(
        Math.floor(Math.random() * indices.length),
        1
      );
      slices.push(context.getImageData(width * index, 0, width, canvas.height));
    }

    slices.forEach((slice, index) => {
      context.putImageData(slice, width * index, 0);
    });

    setTimeout(multiply, Math.random() * SLICE_INTERVAL_MAX);
  };

  multiply();
};
