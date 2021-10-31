const randomInRange = (from, to, convertInt = false) => {
  let x = Math.random() * (to - from);

  if (convertInt) return Math.floor(x + from);
  return x + from;
};

//========== Texture Loader
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load("brick.jpg");

const createCube = (
  width,
  height,
  depth,
  color = Math.random() * 0xffffff,
  position = [0, 0, 0]
) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(depth, height, width),
    new THREE.MeshPhongMaterial({ color: color, map: brickTexture })
  );

  cube.position.x = position[0];
  cube.position.y = position[1];
  cube.position.z = position[2];
  return cube;
};

const createPlane = (width, height, color = Math.random() * 0xffffff) => {
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
      shininess: 0,
    })
  );
  return plane;
};
