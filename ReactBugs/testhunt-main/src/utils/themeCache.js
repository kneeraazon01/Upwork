window.addEventListener('DOMContentLoaded', () => {
	const getTheBall = document.querySelector('.hamburger__footer-settings .ball');
	const getThemBall = document.querySelector('.hamburger__header .ball');

	// =========== Theme cache system ==========
	// check for saved 'darkMode' in localStorage
	let curTheme = localStorage.getItem('curTheme');

	// If the user already visited and enabled darkMode
	// start things off with it on
	if (curTheme === 'enabled') {
		// enableLightMode();
		document.body.classList.add('light');
		getTheBall.classList.add('sticktolight');
		getThemBall.classList.add('sticktolight');
	}
	if (curTheme === 'disabled') {
		// disableLightMode();
		document.body.classList.remove('light');
		getTheBall.classList.add('sticktodark');
		getThemBall.classList.add('sticktodark');
	}
});
