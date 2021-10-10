// Canvas
const canvas = document.querySelector("canvas.webgl");

// Buat Scene
const scene = new THREE.Scene();

// Pengaturan Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;
scene.add(camera);

// Buat Geometry
// 1. Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true })
);
cube.position.x += -12;
cube.position.y += 10;
// 2. Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(2.5, 5, 10, 1),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
cone.position.x += -4;
cone.position.y += 10;

// 3. Cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 5, 10),
  new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
);
cylinder.position.x += 4;
cylinder.position.y += 10;

//4. Dodecahedron
const decohedron = new THREE.Mesh(
  new THREE.DodecahedronGeometry(2.5, 0),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
);
decohedron.position.x += 11;
decohedron.position.y += 10;

//5. Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 0.8, 16, 50),
  new THREE.MeshBasicMaterial({ color: 0x9400d3 })
);
torus.position.x += -11;

//6. Torus Knot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(2, 0.5, 120, 12, 6, 10),
  new THREE.MeshBasicMaterial({ color: 0x76ee00 })
);
torusKnot.position.x += -1;

//7. Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 12, 11),
  new THREE.MeshBasicMaterial({ color: 0xffa200 })
);
sphere.position.x += 9;

const arrGeo = [cube, cone, cylinder, decohedron, torus, torusKnot, sphere];

// Input geometri
arrGeo.forEach((geo) => {
  scene.add(geo);
});

//Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Interactive animation
let mouseX = 0;
let mouseY = 0;
const onDocumentMouseMove = (e) => {
  mouseX = 0.001 * (e.clientX - window.innerWidth / 2);
  mouseY = 0.001 * (e.clientY - window.innerHeight / 2);
};
canvas.addEventListener("mousemove", onDocumentMouseMove);

let torusS = 0.03,
  torusKnotS = 0.04,
  sphereS = 0.02;
const clock = new THREE.Clock();

const mainLoop = () => {
  const elapsedTime = clock.getElapsedTime();

  arrGeo.forEach((geo) => {
    geo.rotation.x = 0.7 * elapsedTime;
    geo.rotation.y = 0.7 * elapsedTime;

    geo.rotation.x += mouseX;
    geo.rotation.y += mouseY;
  });

  if (torus.position.y > 2 || torus.position.y <= -5) {
    torusS = -torusS;
  }
  if (torusKnot.position.y > 2 || torusKnot.position.y <= -5) {
    torusKnotS = -torusKnotS;
  }
  if (sphere.position.y > 2 || sphere.position.y <= -5) {
    sphereS = -sphereS;
  }

  torus.position.y += torusS;
  torusKnot.position.y += torusKnotS;
  sphere.position.y += sphereS;

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
