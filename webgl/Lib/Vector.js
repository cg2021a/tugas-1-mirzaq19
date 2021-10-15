export default class Vector {
  static vertices = [];

  constructor(x, y, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
    Vector.vertices.push(this);
  }

  getArray() {
    return [this.x, this.y, this.z];
  }
}
