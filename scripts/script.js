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

// Handling Navigation
document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('.nav-link');
	// Only select sections that are not columns
	const sections = document.querySelectorAll('section:not(.column-1):not(.column-2)');
	
	const updateActiveSection = (hash) => {
		navLinks.forEach(link => link.classList.remove('active'));
		
		// Only hide non-column sections
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
		}
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
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.querySelector('.menu-toggle');
	const navList = document.querySelector('.nav-list');

	menuToggle?.addEventListener('click', () => {
		const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !isExpanded);
		navList.classList.toggle('active');
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
			menuToggle.setAttribute('aria-expanded', 'false');
			navList.classList.remove('active');
		}
	});
});
