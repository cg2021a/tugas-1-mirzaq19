import * as THREE from "./node_modules/three/src/Three.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();

//=========== Lighting
const ambient = new THREE.AmbientLight(0xffffbb, 1);
const hemisphere = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
const directional = new THREE.DirectionalLight(0xffffff, 1.2);
directional.position.set(50, 50, 50);
const point = new THREE.PointLight(0xffffff, 5, 100);
point.position.set(50, 50, 50);
const spot = new THREE.SpotLight(0xffffff);
spot.position.set(50, 50, 50);

const arrLight = [ambient, hemisphere, directional, point, spot];

//input lighting
arrLight.forEach((light) => {
  scene.add(light);
  light.visible = false;
});
arrLight[0].visible = true;

//Interactive lighting
const lightOption = document.querySelectorAll('input[name="lighting"]');
lightOption[0].checked = true;
lightOption.forEach((option) => {
  option.addEventListener("change", () => {
    console.log(option.value);
    arrLight.forEach((light) => {
      light.visible = false;
    });
    arrLight[option.value].visible = true;
  });
});

//========== Texture Loader
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load("brick.jpg");

//=========== Buat Geometry
// 1. Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ color: 0x00fff0, wireframe: true })
);
cube.position.x += -14;
cube.position.y += 10;
// 2. Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(2.5, 5, 10, 1),
  new THREE.MeshLambertMaterial({ color: 0xffff00 })
);
cone.position.x += -7;
cone.position.y += 10;

// 3. Cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 5, 10),
  new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true })
);
cylinder.position.y += 10;

//4. Dodecahedron
const decohedron = new THREE.Mesh(
  new THREE.DodecahedronGeometry(2.5, 0),
  new THREE.MeshStandardMaterial({ color: 0x00ffff })
);
decohedron.position.x += 6;
decohedron.position.y += 10;

//5. Torus
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(2, 0.8, 16, 50),
  new THREE.MeshPhongMaterial({ color: 0x9400d3, flatShading: true })
);
torus.position.x += -11;

//6. Torus Knot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(2, 0.5, 120, 12, 6, 10),
  new THREE.MeshPhongMaterial({ color: 0x76ee00, flatShading: true })
);
torusKnot.position.x += -1;

//7. Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 12, 11),
  new THREE.MeshPhongMaterial({ color: 0xffa200, flatShading: true })
);
sphere.position.x += 9;
// 8. CubeBrickTexture
const cubeBrick = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ color: 0xc70e33, normalMap: brickTexture })
);
cubeBrick.position.x += 14;
cubeBrick.position.y += 10;

const arrGeo = [
  cube,
  cone,
  cylinder,
  decohedron,
  torus,
  torusKnot,
  sphere,
  cubeBrick,
];

//=========== Input geometri
arrGeo.forEach((geo) => {
  scene.add(geo);
});

// ====== Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(0.85 * sizes.width, 0.85 * sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//========= Pengaturan Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 25);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 5, 0);
controls.update();

//============= Render

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(0.85 * sizes.width, 0.85 * sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    geo.rotation.x += mouseY;
    geo.rotation.y += mouseX;
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
