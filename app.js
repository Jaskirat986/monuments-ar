// Basic data. Replace with your own models/posters.
const monuments = [
	{
		name: 'Taj Mahal',
		description: 'Agra, India — ivory-white marble mausoleum.',
		src: 'models/taj_mahal.glb',
		poster: 'images/taj_poster.jpg',
		iosSrc: 'models/taj_mahal.usdz',
		alt: 'Taj Mahal 3D model',
	},
	{
		name: 'Eiffel Tower',
		description: 'Paris, France — wrought-iron lattice tower.',
		src: 'models/eiffel_tower.glb',
		poster: 'images/eiffel_poster.jpg',
		iosSrc: 'models/eiffel_tower.usdz',
		alt: 'Eiffel Tower 3D model',
	},
	{
		name: 'Pyramids of Giza',
		description: 'Giza, Egypt — ancient pyramids complex.',
		src: 'models/giza_pyramids.glb',
		poster: 'images/giza_poster.jpg',
		iosSrc: 'models/giza_pyramids.usdz',
		alt: 'Giza Pyramids 3D model',
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


