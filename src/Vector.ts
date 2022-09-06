class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  negative = () => {
    return new Vector(-this.x, -this.y, -this.z);
  };

  add = (v: Vector | number) => {
    if (v instanceof Vector) {
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    return new Vector(this.x + v, this.y + v, this.z + v);
  };

  subtract = (v: Vector | number) => {
    if (v instanceof Vector) {
      return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    return new Vector(this.x - v, this.y - v, this.z - v);
  };

  multiply = (v: Vector | number) => {
    if (v instanceof Vector) {
      return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    return new Vector(this.x * v, this.y * v, this.z * v);
  };

  divide = (v: Vector | number) => {
    if (v instanceof Vector) {
      return new Vector(
        this.x / v.x || 0,
        this.y / v.y || 0,
        this.z / v.z || 0
      );
    }
    return new Vector(this.x / v || 0, this.y / v || 0, this.z / v || 0);
  };

  equals = (v: Vector) => {
    return this.x == v.x && this.y == v.y && this.z == v.z;
  };

  dot = (v: Vector | number) => {
    if (v instanceof Vector) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    return this.x * v + this.y * v + this.z * v;
  };

  cross = (v: Vector) => {
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  };

  length = () => {
    return Math.sqrt(this.dot(this));
  };

  unit = () => {
    return this.divide(this.length());
  };

  min = () => {
    return Math.min(Math.min(this.x, this.y), this.z);
  };

  max = () => {
    return Math.max(Math.max(this.x, this.y), this.z);
  };

  //   toAngles = () => {
  //     return {
  //       theta: Math.atan2(this.z, this.x),
  //       phi: Math.asin(this.y / this.length()),
  //     };
  //   };

  //   angleTo = (v: Vector) => {
  //     return Math.acos(this.dot(a) / (this.length() * a.length()));
  //   };

  toArray = (n: 1 | 2 | 3) => {
    return [this.x, this.y, this.z].slice(0, n || 3);
  };

  clone = () => {
    return new Vector(this.x, this.y, this.z);
  };

  toColor = () => {
    // return new Color(this.x, this.y, this.z, 1);
  };
}

export default Vector;
