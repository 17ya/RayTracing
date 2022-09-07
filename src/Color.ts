import Vector from "./Vector";

class Color {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0
  ) {}

  toVector = (): Vector => {
    return new Vector(this.r, this.g, this.b);
  };
}

export default Color;
