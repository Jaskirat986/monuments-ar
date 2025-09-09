// Basic data. Replace with your own models/posters.
const monuments = [
	{
		name: 'Astronaut',
		description: 'Sample model hosted by modelviewer.dev',
		src: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
		poster: 'images/taj_poster.svg',
		iosSrc: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
		alt: 'Astronaut 3D model',
	},
	{
		name: 'Damaged Helmet',
		description: 'Khronos sample hosted by modelviewer.dev',
		src: 'https://modelviewer.dev/shared-assets/models/Warhol.glb',
		poster: 'images/eiffel_poster.svg',
		iosSrc: 'https://modelviewer.dev/shared-assets/models/Warhol.usdz',
		alt: 'Warhol 3D model',
	},
	{
		name: 'Robot Expressive',
		description: 'GLB sample hosted by modelviewer.dev',
		src: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
		poster: 'images/giza_poster.svg',
		iosSrc: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
		alt: 'Robot Expressive 3D model',
	},
];

function createCard(mon) {
	const wrapper = document.createElement('div');
	wrapper.className = 'card';
	wrapper.innerHTML = `
		<model-viewer
			src="${mon.src}"
			poster="${mon.poster}"
			shadow-intensity="1"
			camera-controls
			exposure="1.2"
			auto-rotate
			ar
			ar-modes="scene-viewer webxr quick-look"
			ios-src="${mon.iosSrc}"
			alt="${mon.alt}"></model-viewer>
		<h3>${mon.name}</h3>
		<p>${mon.description}</p>
		<div class="actions">
			<button class="primary" data-action="ar">View in AR</button>
			<button class="secondary" data-action="rotate">Rotate</button>
		</div>
	`;

	const mv = wrapper.querySelector('model-viewer');
	const arBtn = wrapper.querySelector('button[data-action="ar"]');
	const rotBtn = wrapper.querySelector('button[data-action="rotate"]');

	arBtn.addEventListener('click', () => mv.activateAR());
	rotBtn.addEventListener('click', () => mv.toggleAttribute('auto-rotate'));

	return wrapper;
}

function populateGallery() {
	const host = document.getElementById('gallery');
	monuments.forEach((m) => host.appendChild(createCard(m)));
}

function wireHeroAR() {
	const hero = document.getElementById('heroViewer');
	const btn = document.getElementById('arButton');
	btn.addEventListener('click', () => hero.activateAR());
}

window.addEventListener('DOMContentLoaded', () => {
	populateGallery();
	wireHeroAR();

	// Fallback notices
	if (!('modelViewerElement' in window)) {
		console.warn('model-viewer not loaded yet');
	}
});


