const numberInRange = (from, to) => {
  let arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  return arr;
};

const randomInRange = (from, to, convertInt = false) => {
  let x = Math.random() * (to - from);

  if (convertInt) return Math.floor(x + from);
  return x + from;
};

const createCube = (color = Math.random() * 0xffffff) => {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({ color: color })
  );
  cube.click = false;
  cube.name = "cube";
  cube.visible = false;
  cube.coupleColor = color;
  cube.position.x = randomInRange(-20, 20);
  cube.position.y = randomInRange(-20, 20);
  cube.position.z = randomInRange(-20, 20);
  return cube;
};

const createCouple = () => {
  const randomColor = Math.random() * 0xffffff;
  const couple = [];
  couple.push(createCube(randomColor), createCube(randomColor));
  return couple;
};
