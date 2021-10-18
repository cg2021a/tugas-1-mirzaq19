//========== DOM
const SELECT = document.querySelector("#seleksi");
const SCORE = document.querySelector("#score");
const PLAY_BUTTON = document.querySelector("#play-button");
const GAMEOVER = document.querySelector("#gameover");

//========== Canvas
const canvas = document.querySelector("canvas.webgl");

//========== Buat Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbffffb);

//========== Create Lighting
scene.add(new THREE.DirectionalLight(0xffffff, 0.8));
scene.add(new THREE.AmbientLight(0xffffbb, 0.5));

// ====== Sizing
const sizes = {
  width: 0.9 * window.innerWidth,
  height: 0.9 * window.innerHeight,
};

//========= Pengaturan Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 50);

const orbitControls = new THREE.OrbitControls(camera, canvas);
orbitControls.target.set(0, 5, 0);
orbitControls.enableZoom = false;
orbitControls.update();

//============= Render
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//=========== RayCaster
const rayCast = new THREE.Raycaster();
// rayCast.layers.set(1);
const mouse = new THREE.Vector2();
mouse.x = mouse.y = -1;

//=========== Interactive Action
const OBJECT_TOTAL = 50;
let gameOver,
  copBuffer,
  selected = [],
  spawnSpeed,
  bufferSpeed,
  colorSet,
  visibles = [],
  notVisibles = [];

// Mulai game ketika play button ditekan;
PLAY_BUTTON.addEventListener("click", () => {
  gameOver = false;
  selected = [];
  spawnSpeed = 0.005;
  bufferSpeed = 0;
  visibles = [];
  colorSet = randomSet(5);
  notVisibles = numberInRange(2, OBJECT_TOTAL + 1);

  for (; scene.children.length > 2; ) {
    scene.remove(scene.children[2]);
  }

  //========== Create Geometry
  for (let i = 1; i <= OBJECT_TOTAL / 2; i++) {
    copBuffer = createCouple(colorSet);
    copBuffer[0].sceneIndex = 2 * i;
    copBuffer[1].sceneIndex = 2 * i + 1;
    scene.add(copBuffer[0]);
    scene.add(copBuffer[1]);
  }

  PLAY_BUTTON.disabled = true;
  SCORE.innerHTML = 0;
  SELECT.innerHTML = 0;
  GAMEOVER.style.display = "none";
});

// Sizing canvas
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

canvas.addEventListener("click", (e) => {
  // Manipulasi ketika belum gameOver
  if (!gameOver) {
    mouse.x = (e.offsetX / sizes.width) * 2 - 1;
    mouse.y = -(e.offsetY / sizes.height) * 2 + 1;
    rayCast.setFromCamera(mouse, camera);

    //Select Object
    let intersect = rayCast.intersectObjects(scene.children, false);
    selectObject(intersect, selected);

    //Cek pasangan yang diseleksi
    if (selected.length == 2) {
      if (checkCouple(selected, visibles, notVisibles)) SCORE.innerHTML++;
      selected = [];
    }

    SELECT.innerHTML = selected.length;
  }
});

const mainLoop = () => {
  // Cek gameover
  if (!gameOver) bufferSpeed += spawnSpeed;

  // Object Spawning
  if (bufferSpeed >= 1 && notVisibles.length) {
    let spawnIndex = notVisibles.splice(
      randomInRange(0, notVisibles.length - 1),
      1
    );
    visibles.push(...spawnIndex);
    scene.children[spawnIndex].visible = true;

    bufferSpeed = 0;
    spawnSpeed += 0.0001;
  }

  // Cek jumlah object maksimal
  if (visibles.length == OBJECT_TOTAL) {
    gameOver = true;
    PLAY_BUTTON.disabled = false;
    GAMEOVER.style.display = "block";
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
