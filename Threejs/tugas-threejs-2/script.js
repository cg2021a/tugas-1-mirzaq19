const SELECT = document.querySelector("#seleksi");
const SCORE = document.querySelector("#score");
const PLAY_BUTTON = document.querySelector("#play-button");
const GAMEOVER = document.querySelector("#gameover");
const OBJECT_TOTAL = 50;
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
let gameOver = true;
let selected = [];
let spawnSpeed = 0.005;
let bufferSpeed = 0;
let visibles = [];
let notVisibles = numberInRange(2, OBJECT_TOTAL + 1);

PLAY_BUTTON.addEventListener("click", () => {
  gameOver = false;
  selected = [];
  spawnSpeed = 0.005;
  bufferSpeed = 0;
  visibles = [];
  notVisibles = numberInRange(2, OBJECT_TOTAL + 1);
  // for (let i = 2; i <= OBJECT_TOTAL + 1; i++) scene.children[i].visible = false;

  for (; scene.children.length > 2; ) {
    scene.remove(scene.children[2]);
  }

  //========== Create Geometry
  let copBuffer;
  for (let i = 0; i < OBJECT_TOTAL / 2; i++) {
    copBuffer = createCouple();
    // console.log(copBuffer);
    scene.add(copBuffer[0]);
    scene.add(copBuffer[1]);
  }

  PLAY_BUTTON.disabled = true;
  SCORE.innerHTML = 0;
  SELECT.innerHTML = 0;
  GAMEOVER.style.display = "none";
});

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
  if (!gameOver) {
    mouse.x = (e.offsetX / sizes.width) * 2 - 1;
    mouse.y = -(e.offsetY / sizes.height) * 2 + 1;
    rayCast.setFromCamera(mouse, camera);
    let items = rayCast.intersectObjects(scene.children, false);
    let selectFirstItem = true;
    items.forEach((item) => {
      if (item.object.visible && !item.object.click && selectFirstItem) {
        selected.push(item.object);
        item.object.material.color.set(0xffffff);
        item.object.click = true;
        selectFirstItem = false;
      }
    });

    if (selected.length == 2) {
      if (selected[0].coupleColor == selected[1].coupleColor) {
        console.log("cocok");
        selected.forEach((select) => {
          select.visible = false;
          select.material.color.set(select.coupleColor);
          select.click = false;
          for (let i = 2; i <= OBJECT_TOTAL + 1; i++) {
            if (scene.children[i] === select) {
              console.log("ketemu");
              for (let j = 0; j < visibles.length; j++) {
                if (visibles[j] == i) {
                  notVisibles.push(visibles.splice(j, 1));
                  break;
                }
              }
              break;
            }
          }
        });
        SCORE.innerHTML++;
      } else {
        console.log("salah");
        selected.forEach((select) => {
          select.material.color.set(select.coupleColor);
          select.click = false;
        });
      }
      selected = [];
    }
    SELECT.innerHTML = selected.length;
  }
});

const mainLoop = () => {
  if (!gameOver) bufferSpeed += spawnSpeed;
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

  if (visibles.length == OBJECT_TOTAL) {
    gameOver = true;
    PLAY_BUTTON.disabled = false;
    GAMEOVER.style.display = "block";
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(mainLoop);
};

mainLoop();
