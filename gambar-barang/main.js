import Scene from "./../Lib/Scene.js";
import Geometry from "./../Lib/Geometry.js";
import Vector from "./../Lib/Vector.js";
import Face from "./../Lib/Face.js";
import Color from "./../Lib/Color.js";

let canvas, scene;

function main() {
  canvas = document.querySelector("#mycanvas");
  scene = new Scene(canvas);

  // ========= Left Object =============
  let geometry = new Geometry();

  // === Base Tutup (0-3)
  geometry.addVertice(new Vector(-0.75, 0.6));
  geometry.addVertice(new Vector(-0.25, 0.6));
  geometry.addVertice(new Vector(-0.745, 0.15));
  geometry.addVertice(new Vector(-0.245, -0.1));
  geometry.addFace(new Face(0, 1, 2));
  geometry.addFace(new Face(1, 3, 2));

  // Rounded Tutup Kiri (4-7)
  geometry.addVertice(new Vector(-0.73, 0.6)); // Rounded Center
  geometry.addVertice(new Vector(-0.748, 0.62));
  geometry.addVertice(new Vector(-0.743, 0.64), new Color(0.3, 0.0, 0.45));
  geometry.addVertice(new Vector(-0.73, 0.65));
  geometry.addFace(new Face(0, 5, 4));
  geometry.addFace(new Face(5, 6, 4));
  geometry.addFace(new Face(6, 7, 4));

  // Rounded Tutup Kanan (8-11)
  geometry.addVertice(new Vector(-0.27, 0.6)); // Rounded Center
  geometry.addVertice(new Vector(-0.252, 0.62));
  geometry.addVertice(new Vector(-0.257, 0.64), new Color(0.3, 0.0, 0.5));
  geometry.addVertice(new Vector(-0.27, 0.65));
  geometry.addFace(new Face(1, 9, 8));
  geometry.addFace(new Face(9, 10, 8));
  geometry.addFace(new Face(10, 11, 8));

  // Pelengkap Tutup
  geometry.addFace(new Face(4, 7, 8));
  geometry.addFace(new Face(11, 7, 8));

  // Sisi atas (12-13)
  geometry.addVertice(new Vector(-0.7, 0.8), new Color(0.2, 0.0, 0.41));
  geometry.addVertice(new Vector(-0.3, 0.8), new Color(0.2, 0.0, 0.41));
  geometry.addFace(new Face(6, 12, 13));
  geometry.addFace(new Face(6, 10, 13));

  // === Base Wadah Bawah (14-17)
  geometry.addVertice(new Vector(-0.745, 0.15), new Color(0.1, 0.1, 0.1));
  geometry.addVertice(new Vector(-0.725, -0.65), new Color(0.28, 0.28, 0.28));
  geometry.addVertice(new Vector(-0.248, -0.65), new Color(0.1, 0.1, 0.1));
  geometry.addVertice(new Vector(-0.245, -0.1), new Color(0.1, 0.1, 0.1));
  geometry.addFace(new Face(14, 15, 16));
  geometry.addFace(new Face(14, 16, 17));

  // Rounded Wadah Kiri bawah (18-21)
  geometry.addVertice(new Vector(-0.705, -0.65), new Color(0.28, 0.28, 0.28)); // Rounded Center
  geometry.addVertice(new Vector(-0.705, -0.7), new Color(0.28, 0.28, 0.28));
  geometry.addVertice(new Vector(-0.713, -0.695), new Color(0.28, 0.28, 0.28));
  geometry.addVertice(new Vector(-0.72, -0.68), new Color(0.28, 0.28, 0.28));
  geometry.addFace(new Face(18, 19, 20));
  geometry.addFace(new Face(18, 20, 21));
  geometry.addFace(new Face(18, 21, 15));

  // Rounded Wadah Kanan bawah (22-25)
  geometry.addVertice(new Vector(-0.268, -0.65), new Color(0.1, 0.1, 0.1)); // Rounded Center
  geometry.addVertice(new Vector(-0.268, -0.7), new Color(0.1, 0.1, 0.1));
  geometry.addVertice(new Vector(-0.26, -0.695), new Color(0.1, 0.1, 0.1));
  geometry.addVertice(new Vector(-0.253, -0.68), new Color(0.1, 0.1, 0.1));
  geometry.addFace(new Face(22, 23, 24));
  geometry.addFace(new Face(22, 24, 25));
  geometry.addFace(new Face(22, 25, 16));

  // Pelengkap Wadah
  geometry.addFace(new Face(18, 19, 22));
  geometry.addFace(new Face(22, 23, 19));

  // === Base Label (26)
  geometry.addVertice(new Vector(-0.7, 0.55), new Color(0.0, 0.0, 0.0));
  geometry.addVertice(new Vector(-0.695, 0.2), new Color(0.0, 0.0, 0.0));
  geometry.addVertice(new Vector(-0.3, 0.55), new Color(0.0, 0.0, 0.0));
  geometry.addVertice(new Vector(-0.301, 0.01), new Color(0.0, 0.0, 0.0));
  geometry.addFace(new Face(26, 27, 28));
  geometry.addFace(new Face(27, 28, 29));

  scene.add(geometry);
  // ========= End Left Object =============

  // ========= Right Object =============
  let geometry1 = new Geometry();

  // === Base Tutup (0-3)
  geometry1.addVertice(new Vector(0.35, 0.6));
  geometry1.addVertice(new Vector(0.65, 0.6));
  geometry1.addVertice(new Vector(0.355, 0.0));
  geometry1.addVertice(new Vector(0.645, 0.0));
  geometry1.addFace(new Face(0, 1, 2));
  geometry1.addFace(new Face(1, 3, 2));

  // Rounded Tutup Kiri (4-7)
  geometry1.addVertice(new Vector(0.37, 0.6)); // Rounded Center
  geometry1.addVertice(new Vector(0.352, 0.62));
  geometry1.addVertice(new Vector(0.357, 0.64), new Color(0.3, 0.0, 0.45));
  geometry1.addVertice(new Vector(0.37, 0.65));
  geometry1.addFace(new Face(0, 5, 4));
  geometry1.addFace(new Face(5, 6, 4));
  geometry1.addFace(new Face(6, 7, 4));

  // Rounded Tutup Kanan (8-11)
  geometry1.addVertice(new Vector(0.63, 0.6)); // Rounded Center
  geometry1.addVertice(new Vector(0.648, 0.62));
  geometry1.addVertice(new Vector(0.643, 0.64), new Color(0.3, 0.0, 0.45));
  geometry1.addVertice(new Vector(0.63, 0.65));
  geometry1.addFace(new Face(1, 9, 8));
  geometry1.addFace(new Face(9, 10, 8));
  geometry1.addFace(new Face(10, 11, 8));

  // Pelengkap Tutup
  geometry1.addFace(new Face(4, 7, 8));
  geometry1.addFace(new Face(11, 7, 8));

  // Sisi atas (12-13)
  geometry1.addVertice(new Vector(0.4, 0.8), new Color(0.2, 0.0, 0.41));
  geometry1.addVertice(new Vector(0.6, 0.8), new Color(0.2, 0.0, 0.41));
  geometry1.addFace(new Face(6, 12, 13));
  geometry1.addFace(new Face(6, 10, 13));

  // === Base Wadah Bawah (14-17)
  geometry1.addVertice(new Vector(0.355, 0.0), new Color(0.1, 0.1, 0.1));
  geometry1.addVertice(new Vector(0.36, -0.65), new Color(0.28, 0.28, 0.28));
  geometry1.addVertice(new Vector(0.64, -0.65), new Color(0.1, 0.1, 0.1));
  geometry1.addVertice(new Vector(0.645, 0.0), new Color(0.1, 0.1, 0.1));
  geometry1.addFace(new Face(14, 15, 16));
  geometry1.addFace(new Face(14, 16, 17));

  // Rounded Wadah Kiri bawah (18-21)
  geometry1.addVertice(new Vector(0.385, -0.65), new Color(0.28, 0.28, 0.28)); // Rounded Center
  geometry1.addVertice(new Vector(0.385, -0.7), new Color(0.28, 0.28, 0.28));
  geometry1.addVertice(new Vector(0.377, -0.695), new Color(0.28, 0.28, 0.28));
  geometry1.addVertice(new Vector(0.37, -0.68), new Color(0.28, 0.28, 0.28));
  geometry1.addFace(new Face(18, 19, 20));
  geometry1.addFace(new Face(18, 20, 21));
  geometry1.addFace(new Face(18, 21, 15));

  // // // Rounded Wadah Kanan bawah (22-25)
  // geometry1.addVertice(new Vector(-0.268, -0.65), new Color(0.1, 0.1, 0.1)); // Rounded Center
  // geometry1.addVertice(new Vector(-0.268, -0.7), new Color(0.1, 0.1, 0.1));
  // geometry1.addVertice(new Vector(-0.26, -0.695), new Color(0.1, 0.1, 0.1));
  // geometry1.addVertice(new Vector(-0.253, -0.68), new Color(0.1, 0.1, 0.1));
  // geometry1.addFace(new Face(22, 23, 24));
  // geometry1.addFace(new Face(22, 24, 25));
  // geometry1.addFace(new Face(22, 25, 16));

  // // Rounded Wadah Kanan bawah (22-25)
  geometry1.addVertice(new Vector(0.62, -0.65), new Color(0.1, 0.1, 0.1)); // Rounded Center
  geometry1.addVertice(new Vector(0.62, -0.7), new Color(0.1, 0.1, 0.1));
  geometry1.addVertice(new Vector(0.628, -0.695), new Color(0.1, 0.1, 0.1));
  geometry1.addVertice(new Vector(0.635, -0.68), new Color(0.1, 0.1, 0.1));
  geometry1.addFace(new Face(22, 23, 24));
  geometry1.addFace(new Face(22, 24, 25));
  geometry1.addFace(new Face(22, 25, 16));

  // // Pelengkap Wadah
  geometry1.addFace(new Face(18, 19, 22));
  geometry1.addFace(new Face(22, 23, 19));

  scene.add(geometry1);
  // ========= End Right Object =============
}

function update() {
  scene.render();
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

window.onload = () => {
  main();
  animate();
};
