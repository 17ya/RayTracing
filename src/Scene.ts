type Color4 = [r: number, g: number, b: number, a: number];

class Scene {
  canvas: HTMLCanvasElement | null = null;
  context: CanvasRenderingContext2D | null = null;
  sceneInstance: Boolean = false;
  imageData!: ImageData;

  constructor(width: number, height: number, color: Color4) {
    if (!this.sceneInstance) {
      this.createScene(width, height, color);
      this.sceneInstance = true;
    }
  }

  createScene = (width: number, height: number, color: Color4) => {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas";
    this.canvas.width = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.setImageData(color);
  };

  setImageData = (color: Color4) => {
    const imageData = this.getImageData() as ImageData;
    for (var i = 0; i < imageData.data.length; i += 4) {
      // 当该像素是透明的,则设置成指定颜色
      if (imageData.data[i + 3] == 0) {
        imageData.data[i] = color[0];
        imageData.data[i + 1] = color[1];
        imageData.data[i + 2] = color[2];
        imageData.data[i + 3] = color[3];
      }
    }
    this.imageData = imageData;
    this.render(imageData);
  };

  getImageData = () => {
    if (!this.canvas) return;
    return this.context?.getImageData(
      0,
      0,
      this.canvas?.width,
      this.canvas?.height
    );
  };

  setPixel = (x: number, y: number, color: Color4) => {
    const { width = 0, height = 0 } = this.canvas ?? {};
    const glx = Math.abs(width / 2 + (x > width / 2 ? -x : x));
    const gly = Math.abs(height / 2 + (y > height / 2 ? y : -y));
    const bytesPerPixel = color.length;
    const offset = (this.imageData.width * gly + glx) * bytesPerPixel;
    for (var i = 0; i < bytesPerPixel; i++) {
      this.imageData.data[offset + i] = color[i];
    }
    this.render(this.imageData);
  };

  // setLine = (x0, y0, x1, y1, color) => {
  //   x0 = Math.trunc(x0); // use integer values
  //   y0 = Math.trunc(y0);
  //   x1 = Math.trunc(x1);
  //   y1 = Math.trunc(y1);

  //   const dx = Math.abs(x1 - x0);
  //   const dy = -Math.abs(y1 - y0);
  //   const sx = x0 < x1 ? 1 : -1;
  //   const sy = y0 < y1 ? 1 : -1;
  //   let err = dx + dy;
  //   let e2;
  //   /* error value e_xy */
  //   let x = x0;
  //   let y = y0;

  //   while (true) {
  //     this.setPixel(x, y, color);
  //     if (x == x1 && y == y1) break;
  //     e2 = 2 * err; // calculate error for next diagonal pixel
  //     if (e2 >= dy) {
  //       err += dy;
  //       x += sx;
  //     }

  //     if (e2 <= dx) {
  //       err += dx;
  //       y += sy;
  //     }
  //   }
  // };

  getOffset = (x: number, y: number) => {
    const { width = 0, height = 0 } = this.canvas ?? {};
    const glx = Math.abs(width / 2 + (x > width / 2 ? -x : x));
    const gly = Math.abs(height / 2 + (y > height / 2 ? y : -y));
    return (this.imageData.width * gly + glx) * 4;
  };

  render = (imageData: ImageData) => {
    this.context?.putImageData(imageData, 0, 0);
  };
}

export default Scene;
