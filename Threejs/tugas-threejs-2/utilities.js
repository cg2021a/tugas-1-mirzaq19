const randomInRange = (from, to) => {
  let x = Math.random() * (to - from);
  return x + from;
};

const createCube = (color = Math.random() * 0xffffff) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({ color: color })
  );
  cube.click = false;
  cube.name = "cube";
  cube.visible = true;
  cube.coupleColor = color;
  cube.position.x = randomInRange(-30, 30);
  cube.position.y = randomInRange(-30, 30);
  cube.position.z = randomInRange(-30, 30);
  return cube;
};

const createCouple = () => {
  const randomColor = Math.random() * 0xffffff;
  const couple = [];
  couple.push(createCube(randomColor), createCube(randomColor));
  return couple;
};
