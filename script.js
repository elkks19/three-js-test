// Escena del cilindro
const escena = new THREE.Scene();
const camara = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.5, 1000);
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);

// Crear un cilindro
const geometria = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const material = new THREE.MeshBasicMaterial({ color:  0x800080, wireframe: true });
const cilindro = new THREE.Mesh(geometria, material);
escena.add(cilindro);

// Crear una esfera
const geometriaEsfera = new THREE.SphereGeometry(1, 16, 8); 
const materialEsfera = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const esfera = new THREE.Mesh(geometriaEsfera, materialEsfera);
escena.add(esfera);

// Cargar textura de fondo
const texture = new THREE.TextureLoader().load(`gato.jpg`);
// Crear la malla de fondo
const backgroundMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(2, 2),
	new THREE.MeshBasicMaterial({
		map: texture,
		depthTest: false,
		depthWrite: false
	})
);

// La escena de fondo
const backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
backgroundScene.add(backgroundMesh);

// Posicionar el cilindro al lado derecho
cilindro.position.x = 2;
// Posicionar la esfera
esfera.position.x = -2;
esfera.rotation.x = 0.5;
// Posicionar la cámara
camara.position.z = 5;

// Animación
(function animacion() {
	requestAnimationFrame(animacion);
	cilindro.rotation.x += 0.01;
	cilindro.rotation.y += 0.01;

	esfera.rotation.x += 0.01;
	esfera.rotation.y += 0.01;
	esfera.rotation.z += 0.01;

	renderizador.autoClear = false;
	renderizador.clear();
	renderizador.render(backgroundScene, backgroundCamera);
	renderizador.render(escena, camara);
})();

// Ajustes
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
