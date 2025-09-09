(() => {
	let scene, camera, renderer;
	let reticle, hitTestSource = null, hitTestSourceRequested = false;
	let placed = false;

	function init() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

		renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: document.getElementById('xr-canvas') });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.xr.enabled = true;

		const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		light.position.set(0.5, 1, 0.25);
		scene.add(light);

		reticle = new THREE.Mesh(
			new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2),
			new THREE.MeshBasicMaterial({ color: 0x4f8cff })
		);
		reticle.matrixAutoUpdate = false;
		reticle.visible = false;
		scene.add(reticle);

		document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

		const controller = renderer.xr.getController(0);
		controller.addEventListener('select', onSelect);
		scene.add(controller);

		window.addEventListener('resize', onWindowResize);
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function onSelect() {
		if (!reticle.visible || placed) return;
		const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
		const material = new THREE.MeshStandardMaterial({ color: 0x4f8cff });
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.setFromMatrixPosition(reticle.matrix);
		scene.add(mesh);
		placed = true;
	}

	function animate() {
		renderer.setAnimationLoop(render);
	}

	async function onSessionStart() {
		const session = renderer.xr.getSession();
		const viewerSpace = await session.requestReferenceSpace('viewer');
		hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
		hitTestSourceRequested = true;
		session.addEventListener('end', () => {
			hitTestSourceRequested = false;
			hitTestSource = null;
		});
	}

	function render(timestamp, frame) {
		if (frame) {
			const referenceSpace = renderer.xr.getReferenceSpace();
			if (!hitTestSourceRequested) onSessionStart();
			if (hitTestSource) {
				const hitTestResults = frame.getHitTestResults(hitTestSource);
				if (hitTestResults.length) {
					const hit = hitTestResults[0];
					const pose = hit.getPose(referenceSpace);
					reticle.visible = true;
					reticle.matrix.fromArray(pose.transform.matrix);
				} else {
					reticle.visible = false;
				}
			}
		}
		renderer.render(scene, camera);
	}

	init();
	animate();
})();


