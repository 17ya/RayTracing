import Vector3 from "./Vector.js";

export class Ray {
  time: number;

  constructor(
    public origin: Vector3,
    public direction: Vector3,
    options: { time?: number } = {}
  ) {
    this.time = options.time || 1;
  }

  pointAtParameter(t: number = 1) {
    const direction = this.direction;
    const origin = this.origin;
    return origin.add(direction.multiply(t));
  }

  unitDirection() {
    return this.direction.unit();
  }
}
