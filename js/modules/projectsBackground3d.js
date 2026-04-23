export function projectsBackground3d() {
  const canvas = document.querySelector('#page-canvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  camera.position.set(0, 18, 22);
  camera.lookAt(0, 0, 0);

  // I'm building a grid of points that ripple like a wave — fits the techy projects aesthetic
  const cols = 28;
  const rows = 18;
  const spacing = 2.2;
  const pointCount = cols * rows;

  const positions = new Float32Array(pointCount * 3);
  const geo = new THREE.BufferGeometry();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = (r * cols + c) * 3;
      positions[idx]     = (c - cols / 2) * spacing;
      positions[idx + 1] = 0;
      positions[idx + 2] = (r - rows / 2) * spacing;
    }
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x00c8ff,
    size: 0.18,
    transparent: true,
    opacity: 0.45,
    sizeAttenuation: true
  });

  const grid = new THREE.Points(geo, mat);
  scene.add(grid);

  let clock = 0;
  let mouseX = 0;

  function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    clock += 0.018;

    const pos = geo.attributes.position.array;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 3;
        const x = pos[idx];
        const z = pos[idx + 2];
        pos[idx + 1] = Math.sin(clock + x * 0.3) * 0.9 + Math.cos(clock * 0.7 + z * 0.25) * 0.7;
      }
    }

    geo.attributes.position.needsUpdate = true;
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.02;

    renderer.render(scene, camera);
  }

  document.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
}
