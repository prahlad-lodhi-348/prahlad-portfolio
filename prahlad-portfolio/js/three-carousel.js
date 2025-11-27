const carouselContainer = document.getElementById('carousel-container');
const cards = document.querySelectorAll('#carousel-container .project-card');

if (carouselContainer && cards.length && window.THREE && window.THREE.CSS3DRenderer) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, carouselContainer.offsetWidth / carouselContainer.offsetHeight, 1, 4000);
  camera.position.set(0, 0, 900);

  const renderer = new THREE.CSS3DRenderer();
  renderer.setSize(carouselContainer.offsetWidth, carouselContainer.offsetHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  carouselContainer.innerHTML = '';
  carouselContainer.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const radius = 520;
  cards.forEach((card, index) => {
    card.classList.add('backdrop-blur-xl');
    const object = new THREE.CSS3DObject(card);
    const angle = (index / cards.length) * Math.PI * 2;
    object.position.set(Math.cos(angle) * radius, (index % 2 === 0 ? 60 : -60), Math.sin(angle) * radius);
    object.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(object);
  });

  let isDragging = false;
  let previousX = 0;
  let targetRotation = 0;
  let currentRotation = 0;

  const startDrag = (event) => {
    isDragging = true;
    previousX = event.clientX;
  };

  const stopDrag = () => { isDragging = false; };

  const onDrag = (event) => {
    if (!isDragging) return;
    const delta = (event.clientX - previousX) * 0.005;
    targetRotation += delta;
    previousX = event.clientX;
  };

  renderer.domElement.addEventListener('pointerdown', startDrag);
  window.addEventListener('pointerup', stopDrag);
  window.addEventListener('pointerleave', stopDrag);
  renderer.domElement.addEventListener('pointermove', onDrag);
  renderer.domElement.addEventListener('wheel', (event) => {
    targetRotation += event.deltaY * 0.0005;
  });

  function animate() {
    requestAnimationFrame(animate);
    currentRotation += (targetRotation - currentRotation) * 0.05;
    group.rotation.y = currentRotation;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = carouselContainer.offsetWidth / carouselContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(carouselContainer.offsetWidth, carouselContainer.offsetHeight);
  });
}



