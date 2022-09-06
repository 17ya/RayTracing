export function PPM(scene: { [x: string]: any }) {
  const { width, height } = scene.canvas;
  const imageData = scene.getImageData();

  for (let x = 0; x <= width / 2; x++) {
    for (let y = 0; y <= height / 2; y++) {
      const offset = scene.getOffset(-x, y);
      const color = [x, y, 0.2, 255];
      for (var i = 0; i < color.length; i++) {
        imageData.data[offset + i] = color[i];
      }
    }
  }

  scene.render(imageData);
}
