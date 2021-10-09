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
  new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true })
);
cylinder.position.x += 4;
cylinder.position.y += 10;

//4. Dodecahedron
const decohedron = new THREE.Mesh(
  new THREE.DodecahedronGeometry(3, 0),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
);

decohedron.position.x += 12;
decohedron.position.y += 10;

const arrGeo = [cube, cone, cylinder, decohedron];

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

const mainLoop = () => {
  arrGeo.forEach((geo) => {
    geo.rotation.x += 0.01;
    geo.rotation.y += 0.01;
    geo.rotation.z += 0.01;
  });

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
