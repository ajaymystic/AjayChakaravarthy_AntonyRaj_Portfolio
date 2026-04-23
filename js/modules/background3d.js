export function background3d() {
  const canvas = document.querySelector("#hero-canvas");
  if (!canvas) return;
  if (typeof THREE === "undefined") return;

  const PARTICLE_COUNT = 100;
  const MAX_CONNECT_DIST = 12;
  const MAX_LINE_SEGMENTS = 5000;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 500);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // I'm storing each particle's position and velocity as a plain object
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x:  (Math.random() - 0.5) * 60,
      y:  (Math.random() - 0.5) * 40,
      z:  (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 0.024,
      vy: (Math.random() - 0.5) * 0.024,
      vz: (Math.random() - 0.5) * 0.01
    });
  }

  const particlePositions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlePositions[i * 3]     = particles[i].x;
    particlePositions[i * 3 + 1] = particles[i].y;
    particlePositions[i * 3 + 2] = particles[i].z;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x00C8FF,
    size: 0.22,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // I'm pre-allocating line buffers for the maximum possible connections
  const linePositions = new Float32Array(MAX_LINE_SEGMENTS * 6);
  const lineColors    = new Float32Array(MAX_LINE_SEGMENTS * 6);

  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
  lineGeo.setAttribute("color",    new THREE.BufferAttribute(lineColors, 3));
  lineGeo.setDrawRange(0, 0);

  const lineMat = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.32
  }));
  scene.add(lineMat);

  let mouseX = 0;
  let mouseY = 0;

  function handleMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function handleResize() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function updateParticles() {
    const pos = particleGeo.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].z += particles[i].vz;

      if (particles[i].x >  30) { particles[i].x = -30; }
      if (particles[i].x < -30) { particles[i].x =  30; }
      if (particles[i].y >  20) { particles[i].y = -20; }
      if (particles[i].y < -20) { particles[i].y =  20; }
      if (particles[i].z >  10) { particles[i].z = -10; }
      if (particles[i].z < -10) { particles[i].z =  10; }

      pos[i * 3]     = particles[i].x;
      pos[i * 3 + 1] = particles[i].y;
      pos[i * 3 + 2] = particles[i].z;
    }

    particleGeo.attributes.position.needsUpdate = true;
  }

  function updateConnections() {
    let segIndex = 0;
    const lPos = lineGeo.attributes.position.array;
    const lCol = lineGeo.attributes.color.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dz   = particles[i].z - particles[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_CONNECT_DIST && segIndex < MAX_LINE_SEGMENTS) {
          const str = 1 - dist / MAX_CONNECT_DIST;

          lPos[segIndex * 6]     = particles[i].x;
          lPos[segIndex * 6 + 1] = particles[i].y;
          lPos[segIndex * 6 + 2] = particles[i].z;
          lPos[segIndex * 6 + 3] = particles[j].x;
          lPos[segIndex * 6 + 4] = particles[j].y;
          lPos[segIndex * 6 + 5] = particles[j].z;

          // I'm blending from crimson red to electric cyan based on closeness
          lCol[segIndex * 6]     = str * 1.0;
          lCol[segIndex * 6 + 1] = str * 0.18;
          lCol[segIndex * 6 + 2] = str * 0.33;
          lCol[segIndex * 6 + 3] = 0;
          lCol[segIndex * 6 + 4] = str * 0.78;
          lCol[segIndex * 6 + 5] = str * 1.0;

          segIndex++;
        }
      }
    }

    lineGeo.setDrawRange(0, segIndex * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate    = true;
  }

  function animate() {
    requestAnimationFrame(animate);
    updateParticles();
    updateConnections();

    camera.position.x += (mouseX * 4 - camera.position.x) * 0.018;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.018;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  document.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);

  animate();
}
