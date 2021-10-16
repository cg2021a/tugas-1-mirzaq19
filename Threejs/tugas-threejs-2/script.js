//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbffffb);

//========== Create Lighting
scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
scene.add(new THREE.AmbientLight(0xffffbb, 0.5));

//========== Create Geometry
let copBuffer;
for (let i = 0; i < 5; i++) {
  copBuffer = createCouple();
  // console.log(copBuffer);
  scene.add(copBuffer[0]);
  scene.add(copBuffer[1]);
}

// ====== Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = 0.9 * window.innerWidth;
  sizes.height = 0.9 * window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
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

const orbitControls = new THREE.OrbitControls(camera, canvas);
orbitControls.target.set(0, 5, 0);
orbitControls.enableZoom = false;
orbitControls.update();

//============= Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//=========== RayCaster
const rayCast = new THREE.Raycaster();
// rayCast.layers.set(1);
const mouse = new THREE.Vector2();
mouse.x = mouse.y = -1;

//=========== Interactive Action
let selected = [];

// const pointControls = new THREE.PointerLockControls(
//   camera,
//   renderer.domElement
// );
// const clock = new THREE.Clock();
// let keyboard = [];
// canvas.addEventListener("click", () => {
//   pointControls.lock();
// });
// document.addEventListener("keydown", (e) => {
//   keyboard[e.key] = true;
// });
// document.addEventListener("keyup", (e) => {
//   keyboard[e.key] = false;
// });
canvas.addEventListener("click", (e) => {
  mouse.x = (e.offsetX / sizes.width) * 2 - 1;
  mouse.y = -(e.offsetY / sizes.height) * 2 + 1;
  rayCast.setFromCamera(mouse, camera);
  let items = rayCast.intersectObjects(scene.children, false);
  if (items.length) {
    selected.push(items[0].object);
    items[0].object.material.color.set(0xffffff);
  }

  if (selected.length == 2) {
    console.log(selected);
    if (selected[0].coupleColor == selected[1].coupleColor) {
      console.log("cocok");
      selected.forEach((select) => {
        select.visible = false;
      });
    } else {
      console.log("salah");
      selected.forEach((select) => {
        select.material.color.set(select.coupleColor);
      });
    }
    selected = [];
  }

  // console.log(selected);
  console.log(scene.children);
});

// const processingKeyboard = (delta) => {
//   const SPEED = 30;
//   const actualSpeed = SPEED * delta;
//   if (keyboard["q"]) camera.position.y += actualSpeed;
//   if (keyboard["e"]) camera.position.y += -actualSpeed;
//   if (keyboard["w"]) pointControls.moveForward(actualSpeed);
//   if (keyboard["s"]) pointControls.moveForward(-actualSpeed);
//   if (keyboard["a"]) pointControls.moveRight(-actualSpeed);
//   if (keyboard["d"]) pointControls.moveRight(actualSpeed);
// };
// const processingKeyboard = (delta) => {
//   const SPEED = 30;
//   const actualSpeed = SPEED * delta;
//   if (keyboard["q"]) camera.position.y += actualSpeed;
//   if (keyboard["e"]) camera.position.y += -actualSpeed;
//   if (keyboard["w"]) camera.position.z += -actualSpeed;
//   if (keyboard["s"]) camera.position.z += actualSpeed;
//   if (keyboard["a"]) camera.position.x += -actualSpeed;
//   if (keyboard["d"]) camera.position.x += +awactualSpeed;
// };

// console.log(scene.children[2].coupleColor == scene.children[3].coupleColor);
// console.log(scene.children[3].material.color);

const mainLoop = () => {
  // let delta = clock.getDelta();
  // processingKeyboard(delta);
  // console.log(camera.position);
  // orbitControls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
