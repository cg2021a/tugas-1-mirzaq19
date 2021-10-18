const numberInRange = (from, to, increment = 1) => {
  let arr = [];
  for (let i = from; i <= to; i += increment) {
    arr.push(i);
  }
  return arr;
};

const randomInRange = (from, to, convertInt = false) => {
  let x = Math.random() * (to - from);

  if (convertInt) return Math.floor(x + from);
  return x + from;
};

const randomSet = (num) => {
  let buffer = [];
  for (let i = 0; i < num; i++) {
    buffer.push(Math.random());
  }
  return buffer;
};

const searchIndex = (arr, num) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num) return i;
  }
};

const selectObject = (intersect, selected) => {
  let selectFirstItem = true;
  intersect.forEach((item) => {
    if (item.object.visible && !item.object.click && selectFirstItem) {
      selected.push(item.object);
      item.object.material.color.set(0xffffff);
      item.object.click = true;
      selectFirstItem = false;
    }
  });
};

const checkCouple = (selected, visibles, notVisibles) => {
  if (selected[0].coupleColor == selected[1].coupleColor) {
    selected.forEach((item) => {
      item.visible = false;
      item.material.color.set(item.coupleColor);
      item.click = false;
      notVisibles.push(
        ...visibles.splice(searchIndex(visibles, item.sceneIndex), 1)
      );
    });
    return true;
  } else {
    selected.forEach((item) => {
      item.material.color.set(item.coupleColor);
      item.click = false;
    });
    return false;
  }
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

const createCouple = (colorSet) => {
  const randomColor =
    colorSet[randomInRange(0, colorSet.length, true)] * 0xffffff;
  const couple = [];
  couple.push(createCube(randomColor), createCube(randomColor));
  return couple;
};
