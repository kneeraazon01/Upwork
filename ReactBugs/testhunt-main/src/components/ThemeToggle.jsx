import React from 'react';

const ThemeToggle = ({ isMobile = false }) => {
	const handleChange = (isMobile) => {
		const getTheBall = document.querySelector('.hamburger__footer-settings .ball');
		const getThemBall = document.querySelector('.hamburger__header .ball');

		//switch light and dark themes
		if (!isMobile) {
			document.body.classList.toggle('light');
			if (document.body.classList.contains('light')) {
				localStorage.setItem('curTheme', 'enabled');

				getTheBall.classList.add('sticktolight');
				getTheBall.classList.remove('sticktodark');
			} else {
				localStorage.setItem('curTheme', 'disabled');

				getTheBall.classList.remove('sticktolight');
				getTheBall.classList.add('sticktodark');
			}
		} else {
			document.body.classList.toggle('light');
			if (document.body.classList.contains('light')) {
				localStorage.setItem('curTheme', 'enabled');

				getThemBall.classList.add('sticktolight');
				getThemBall.classList.remove('sticktodark');
			} else {
				localStorage.setItem('curTheme', 'disabled');

				getThemBall.classList.remove('sticktolight');
				getThemBall.classList.add('sticktodark');
			}
		}
	};

	return isMobile ? (
		<div className='switch'>
			<input
				type='checkbox'
				className='checkbox0'
				id='checkbox0'
				onChange={() => handleChange(isMobile)}
			/>
			<label htmlFor='checkbox0' className='label0'>
				<i className='start dark'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M14.125 14.125L15.25 15.25L14.125 14.125ZM16 10H17.5H16ZM5.875 5.875L4.75 4.75L5.875 5.875ZM14.125 5.875L15.25 4.75L14.125 5.875ZM5.875 14.125L4.75 15.25L5.875 14.125ZM2.5 10H4H2.5ZM10 2.5V4V2.5ZM10 16V17.5V16ZM13 10C13 11.6568 11.6568 13 10 13C8.34314 13 7 11.6568 7 10C7 8.34314 8.34314 7 10 7C11.6568 7 13 8.34314 13 10Z'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</i>
				<i className='end white'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16.6435 11.7144C16.3396 12.799 15.7619 13.8227 14.9104 14.676C12.262 17.3303 7.96801 17.3303 5.31957 14.676C2.67115 12.0218 2.67115 7.71858 5.31957 5.0644C6.16559 4.21656 7.1795 3.63954 8.25405 3.33337C7.64985 5.60078 8.34004 8.09142 10.115 9.87025C11.89 11.6491 14.4041 12.2358 16.6666 11.6303'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</i>
				<span className='ball'></span>
			</label>
		</div>
	) : (
		<div className='switch'>
			<input
				type='checkbox'
				className='checkbox'
				id='checkbox'
				onChange={() => handleChange(isMobile)}
			/>
			<label htmlFor='checkbox' className='label'>
				<i className='start dark'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M14.125 14.125L15.25 15.25L14.125 14.125ZM16 10H17.5H16ZM5.875 5.875L4.75 4.75L5.875 5.875ZM14.125 5.875L15.25 4.75L14.125 5.875ZM5.875 14.125L4.75 15.25L5.875 14.125ZM2.5 10H4H2.5ZM10 2.5V4V2.5ZM10 16V17.5V16ZM13 10C13 11.6568 11.6568 13 10 13C8.34314 13 7 11.6568 7 10C7 8.34314 8.34314 7 10 7C11.6568 7 13 8.34314 13 10Z'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</i>
				<i className='end white'>
					<svg
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16.6435 11.7144C16.3396 12.799 15.7619 13.8227 14.9104 14.676C12.262 17.3303 7.96801 17.3303 5.31957 14.676C2.67115 12.0218 2.67115 7.71858 5.31957 5.0644C6.16559 4.21656 7.1795 3.63954 8.25405 3.33337C7.64985 5.60078 8.34004 8.09142 10.115 9.87025C11.89 11.6491 14.4041 12.2358 16.6666 11.6303'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</i>
				<span className='ball'></span>
			</label>
		</div>
	);
};

export default ThemeToggle;
