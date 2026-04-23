export function pageBackground3d() {
  const canvas = document.querySelector('#page-canvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 5;

  const particleCount = 90;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 22;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.04,
    transparent: true,
    opacity: 0.35
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

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
    particles.rotation.y += 0.0004;
    particles.rotation.x += 0.0002;
    camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.02;
    renderer.render(scene, camera);
  }

  document.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
}
