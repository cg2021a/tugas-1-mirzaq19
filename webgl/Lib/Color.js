export default class Color {
  static rgb = [];

  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    Color.rgb.push(this);
  }

  getArray() {
    return [this.r, this.g, this.b];
  }
}
