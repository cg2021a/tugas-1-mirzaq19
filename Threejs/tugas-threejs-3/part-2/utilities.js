const createSphere = (
  radius,
  heightSeg,
  widthSeg,
  color = Math.random() * 0xffffff,
  position = [0, 0, 0]
) => {
  const cube = new THREE.Mesh(
    new THREE.SphereGeometry(radius, heightSeg, widthSeg),
    new THREE.MeshPhongMaterial({ color: color })
  );

  cube.position.x = position[0];
  cube.position.y = position[1];
  cube.position.z = position[2];
  return cube;
};
