import Vector from "./Vector.js";
import Color from "./Color.js";

export default class Geometry {
  _vertices = []; // Vector
  _faces = [];
  _colors = [];

  //position :Vector
  constructor(position = new Vector(0, 0, 0)) {
    this.position = position;
  }

  //Vector
  addVertice(vertice, color = new Color(0.33, 0.0, 0.61)) {
    this._vertices.push(vertice);
    this._colors.push(color);
  }

  addFace(face) {
    this._faces.push(face);
  }

  addColor(color) {
    this._colors.push(color);
  }

  getVerticeArray() {
    let vertices = [];

    this._faces.forEach((faces) => {
      faces
        .getArray()
        .forEach((index) =>
          vertices.push(
            ...this._vertices[index].getArray(),
            ...this._colors[index].getArray()
          )
        );
    });

    return vertices;
  }

  getColorArray() {
    return this._colors;
  }
}
