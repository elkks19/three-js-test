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
const geometriaEsfera = new THREE.SphereGeometry( 1, 16, 8 ); 
const materialEsfera = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
const esfera = new THREE.Mesh( geometriaEsfera, materialEsfera );
escena.add(esfera);


// Posicionar el cilindro al lado derecho
cilindro.position.x = 2;
// Posicionar la esfera
esfera.position.x = -2;
esfera.rotation.x = 0.5;
// Posicionar la cámara
camara.position.z = 5;

// Animación del cilindro...
(function animacion() {
	requestAnimationFrame(animacion);
	cilindro.rotation.x += 0.01;
	cilindro.rotation.y += 0.01;

	esfera.rotation.x += 0.01;
	esfera.rotation.y += 0.01;
	esfera.rotation.z += 0.01;

	renderizador.render(escena, camara);
})();

// Ajustes    
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});
