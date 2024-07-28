const images = ["images/index/IMG_3565.jpg"];
const image = new Image();
image.src = images[Math.floor(Math.random() * images.length)];
image.onload = () => {
  const canvas = document.createElement("canvas");
  document.querySelector("#images").append(canvas);
  const multiply = () => {
    const aspectRatio = image.height / image.width;
    canvas.width = 270;
    canvas.height = canvas.width * aspectRatio;
    canvas.style.marginBottom = "16px";
    const count = Math.ceil(Math.random() * 15);
    const slices = [];
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    const width = canvas.width / count;
    const indices = [...Array(count).keys()];
    while (indices.length !== 0) {
      const index = indices.splice(
        Math.floor(Math.random() * indices.length),
        1
      );
      slices.push(
        canvas
          .getContext("2d")
          .getImageData(width * index, 0, width, canvas.height)
      );
    }
    slices.forEach((slice, index) => {
      canvas.getContext("2d").putImageData(slice, width * index, 0);
    });
    setTimeout(multiply, Math.random() * 50);
  };
  multiply();
};
