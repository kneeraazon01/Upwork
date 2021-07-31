import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowIcon } from './SVGCollection';
import { useHistory, useLocation } from 'react-router-dom';

const scrolltoUpSubs = ['/community', '/about'];

const HamburgerItem = ({
	name,
	icon = null,
	subItems = [],
	link = '',
	id = '',
	activeLink,
	subLinkId = '',
	onClickItemHandle = () => {},
}) => {
	const history = useHistory();
	const location = useLocation();
	const hasActiveSub =
		subItems && subItems.length && subItems.some((item) => item.link === location.pathname);

	const onClickMainItemHandle = (link, sub, shouldNotCloseMenu) => {
		const hamburger = document.querySelector('.hamburger'),
			hamburgerSwitch = document.querySelector('.header__swt'),
			hamburgerSwitch0 = document.querySelector('.header__swt111');

		const onClickButtonHandler = () => {
			if (!hamburger.classList.contains('yyy')) {
				hamburger.classList.add('yyy');
			} else {
				hamburger.classList.remove('yyy');
				hamburger.classList.add('slideleft');
			}
			hamburgerSwitch.style.display = 'none';
			hamburgerSwitch0.style.display = 'block';
		};

		const onClickSecondButtonHandler = () => {
			if (!hamburger.classList.contains('yyy')) {
				hamburger.classList.add('yyy');
				hamburger.classList.remove('slideleft');
			} else {
				hamburger.classList.remove('yyy');
			}
			hamburgerSwitch0.style.display = 'none';
			hamburgerSwitch.style.display = 'block';
		};

		if (window.innerWidth <= 480 && !shouldNotCloseMenu) {
			if (hamburgerSwitch0.style.display === 'none') {
				onClickButtonHandler();
			} else {
				onClickSecondButtonHandler();
			}
		}

		if (subItems.length) {
			const hamburger = document.querySelector('.hamburger'),
				rightArea = document.querySelector('.right-area'),
				footer = document.querySelector('.footer__block'),
				subLinksto = document.getElementById(subLinkId || '3291832371931987311264hjsd0');

			if (hamburger.classList.contains('closed')) {
				hamburger.classList.remove('closed');
				hamburger.classList.remove('closedButton');
				rightArea.classList.remove('closedMain');
				footer.classList.remove('closedMain');
				subLinksto.classList.toggle('oo');
			} else if (!sub) {
				subLinksto.classList.toggle('oo');
			}
		}

		onClickItemHandle(link || subLinkId);
		if (!sub && link) history.push(link);
		else if (sub && !scrolltoUpSubs.includes(sub)) {
			setTimeout(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}, 0);
			setTimeout(() => {
				document.getElementById(sub)?.scrollIntoView();
			}, 300);
		}
		if (!subLinkId || scrolltoUpSubs.includes(sub)) {
			setTimeout(() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}, 0);
		}
	};

	return (
		<>
			<div
				className={`hamburger__item ${
					activeLink === link || activeLink === subLinkId ? 'active' : ''
				}`}
				id={id}
				onClick={() => onClickMainItemHandle(link, undefined, subItems.length)}
			>
				{!subItems.length ? (
					<Link to={link} className='linkto'>
						{icon}
						<div className='bt'>
							{name}
							{!!subItems.length && <ArrowIcon />}
						</div>
					</Link>
				) : (
					<div className='linkto'>
						{icon}
						<div className='bt'>
							{name}
							{!!subItems.length && <ArrowIcon />}
						</div>
					</div>
				)}{' '}
			</div>
			{!!subItems.length && (
				<div className={`subLinksto ${hasActiveSub ? 'oo' : ''}`} id={subLinkId}>
					{subItems.map(({ link, subName }) => {
						const uniqKey = link;
						return (
							<div
								onClick={() => onClickMainItemHandle(uniqKey, link)}
								key={uniqKey}
								className={`item-link ${activeLink === uniqKey ? 'kkkkk' : ''}`}
							>
								<Link to={link || '#'}>{subName}</Link>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default HamburgerItem;
