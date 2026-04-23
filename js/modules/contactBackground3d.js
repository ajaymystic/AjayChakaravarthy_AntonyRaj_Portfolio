export function contactBackground3d() {
  const canvas = document.querySelector('#page-canvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  camera.position.z = 6;

  // I'm creating a deep star field — calm and inviting, suits the contact page
  const starCount = 260;
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3]     = (Math.random() - 0.5) * 40;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    starSizes[i] = Math.random() * 0.06 + 0.01;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });

  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  // I'm adding a second layer of larger, dimmer stars for depth
  const bgStarGeo = new THREE.BufferGeometry();
  const bgPositions = new Float32Array(80 * 3);

  for (let i = 0; i < 80; i++) {
    bgPositions[i * 3]     = (Math.random() - 0.5) * 50;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  bgStarGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));

  const bgStarMat = new THREE.PointsMaterial({
    color: 0xa78bfa,
    size: 0.08,
    transparent: true,
    opacity: 0.2,
    sizeAttenuation: true
  });

  const bgStars = new THREE.Points(bgStarGeo, bgStarMat);
  scene.add(bgStars);

  let mouseX = 0;
  let mouseY = 0;
  let time = 0;

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
    time += 0.003;

    stars.rotation.y = time * 0.06;
    stars.rotation.x = time * 0.02;
    bgStars.rotation.y = time * 0.03;

    // I'm making the opacity pulse gently for a twinkling effect
    starMat.opacity = 0.45 + Math.sin(time * 2.5) * 0.15;

    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (mouseY * 1.0 - camera.position.y) * 0.02;

    renderer.render(scene, camera);
  }

  document.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);
  animate();
}
