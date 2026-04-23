export function aboutBackground3d() {
  const canvas = document.querySelector('#page-canvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 28;

  // I'm creating floating wireframe icosahedrons to give the about page a thoughtful, geometric feel
  const shapes = [];
  const shapeCount = 14;

  for (let i = 0; i < shapeCount; i++) {
    const size = Math.random() * 2.5 + 0.8;
    const geo = new THREE.IcosahedronGeometry(size, 0);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: Math.random() * 0.12 + 0.04
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20
    );

    mesh.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    shapes.push({
      mesh: mesh,
      rx: (Math.random() - 0.5) * 0.004,
      ry: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.006
    });

    scene.add(mesh);
  }

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    shapes.forEach(function (obj) {
      obj.mesh.rotation.x += obj.rx;
      obj.mesh.rotation.y += obj.ry;
      obj.mesh.position.y += obj.vy;

      if (obj.mesh.position.y > 22) { obj.mesh.position.y = -22; }
      if (obj.mesh.position.y < -22) { obj.mesh.position.y = 22; }
    });

    camera.position.x += (mouseX * 3 - camera.position.x) * 0.015;
    camera.position.y += (mouseY * 2 - camera.position.y) * 0.015;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  document.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
}
