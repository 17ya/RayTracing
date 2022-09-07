// import Color from "./Color.js";

import Scene from "../other/Scene";
import Color from "./Color";
import { Ray } from "./Ray";
import Vector from "./Vector";

const scene = new Scene(400, 500, [255, 255, 255, 255]);

const rayColor = (r: Ray) => {
  const unitDirection = r.direction.unit();
  const t = 0.5 * (unitDirection.y + 1.0);
  const a = new Color(1.0, 1.0, 1.0).toVector();
  const b = new Color(0.5, 0.7, 1.0).toVector();
  //线性插值
  return a.multiply(1.0 - t).add(b.multiply(t));
};

//Image
const aspect_ratio = 16.0 / 9.0;
const image_width = 400;
const image_height = image_width / aspect_ratio;

//Camera
const viewport_height = 2.0;
const viewport_width = aspect_ratio * viewport_height;
const focal_length = 1.0;

const origin = new Vector(0, 0, 0);
const horizontal = new Vector(viewport_width, 0, 0);
const vertical = new Vector(0, viewport_height, 0);

//视口左下角的坐标
const lower_left_corner = origin
  .subtract(horizontal.divide(2))
  .subtract(vertical.divide(2))
  .subtract(new Vector(0, 0, focal_length));

const imageData = scene.getImageData();

for (let j = image_height - 1; j >= 0; --j) {
  for (let i = 0; i < image_width; ++i) {
    const u = i / (image_width - 1);
    const v = j / (image_height - 1);

    const direction = lower_left_corner
      .add(horizontal.multiply(u))
      .add(vertical.multiply(v))
      .subtract(origin);

    const pixel_color = rayColor(new Ray(origin, direction));

    const offset = scene.getOffset(i, j);

    const color = [
      pixel_color.x * 255.999,
      pixel_color.y * 255.999,
      pixel_color.z * 255.999,
      255,
    ];

    for (let k = 0; k < color.length; k++) {
      //@ts-ignore
      imageData.data[offset + k] = color[k];
    }
  }
}
//@ts-ignore
scene.render(imageData);
