const checkbox = document.getElementById('checkbox');
const theme = localStorage.getItem('theme');

// Theme (dark/light) picker JS
if (theme === 'dark') {
	document.documentElement.setAttribute('data-theme', 'dark');
	checkbox.checked = true;
}

checkbox.addEventListener('change', function() {
	if (this.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
});

// Handling Navigation and Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('section:not(.column-1):not(.column-2)');
	const navList = document.querySelector('.nav-list');
	const menuToggle = document.querySelector('.menu-toggle');

	const updateActiveSection = (hash) => {
		navLinks.forEach(link => link.classList.remove('active'));
		sections.forEach(section => section.style.display = 'none');

		const targetId = hash || navLinks[0].getAttribute('href');
		const targetSection = document.querySelector(targetId);
		const targetLink = document.querySelector(`a[href="${targetId}"]`);

		if (targetSection) {
			targetSection.style.display = 'block';
			targetLink?.classList.add('active');

			targetSection.style.opacity = 0;
			setTimeout(() => {
				targetSection.style.transition = 'opacity 0.4s ease-in';
				targetSection.style.opacity = 1;
			}, 10);

			const offset = 16; // additional padding
			const elementPosition = targetSection.getBoundingClientRect().top;
			const offsetPosition = elementPosition - offset;

			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}

		menuToggle.setAttribute('aria-expanded', 'false');
		navList.classList.remove('active');
	};

	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const hash = link.getAttribute('href');
			history.pushState(null, '', hash);
			updateActiveSection(hash);
		});
	});

	window.addEventListener('popstate', () => {
		updateActiveSection(window.location.hash);
	});

	updateActiveSection(window.location.hash);

	menuToggle?.addEventListener('click', () => {
		const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !isExpanded);
		navList.classList.toggle('active');
	});

	document.addEventListener('click', (e) => {
		if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navList.classList.remove('active');
		}
	});
});
