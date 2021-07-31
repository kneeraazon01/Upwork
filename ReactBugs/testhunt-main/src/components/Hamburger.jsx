import React, { useState } from 'react';
import Toggle from './ThemeToggle';
import {
	InstagramLogo,
	FacebookLogo,
	TelegramLogo,
	DiscordLogo,
	RedditLogo,
	GithubLogo,
	TwitterLogo,
	SettingsIcon,
	LanguageIcon,
	PlatformRoadmapIcon,
	MediaIcon,
	MerchIcon,
	BlogIcon,
	GemsIcon,
	MineIcon,
	TroveIcon,
	BountyIcon,
	TreasureIcon,
	NFTFamilyIcon,
	BitDiamondTokenIcon,
	HomeIcon,
} from './SVGCollection';
import HamburgerItem from './HamburgerItem';
import { useLocation } from 'react-router-dom';

const links = [
	{
		href: 'https://www.instagram.com/btdmd/',
		logo: <InstagramLogo />,
	},
	{
		href: 'https://www.facebook.com/BitDiamond-105486601684349',
		logo: <FacebookLogo />,
	},
	{
		href: 'https://t.me/Official_BitDiamond',
		logo: <TelegramLogo />,
	},
	{
		href: 'https://discord.com/invite/9zPsFBwwJB',
		logo: <DiscordLogo />,
	},
	{
		href: 'https://www.reddit.com/r/BitDiamond/',
		logo: <RedditLogo />,
	},
	{
		href: 'https://github.com/keyoke-code',
		logo: <GithubLogo />,
	},
	{
		href: 'https://twitter.com/bitdmd',
		logo: <TwitterLogo />,
	},
];

const hamburgerItems = [
	{
		name: 'Home',
		icon: <HomeIcon />,
		subItems: [],
		id: '11',
		subLinkId: '',
    link: '/',
	},
	{
		name: 'BitDiamond Token',
		icon: <BitDiamondTokenIcon />,
		subItems: [
			{
				subName: 'About BitDiamond',
        link: '/about',
			},
			{
				subName: 'Links',
        link: '/links',
			},
			{
				subName: 'Staying SAFU',
        link: '/safu',
			},
		],
		id: '12',
		subLinkId: 'bitDiamond_list',
	},
	{
		name: 'NFT Family',
		icon: <NFTFamilyIcon />,
		subItems: [
			{
				subName: 'Community',
        link: '/community',
			},
			{
				subName: 'Treasure',
        link: '/nft-trasure',
			},
			{
				subName: 'Bounty, Trove and Claim',
        link: '/bts',
			},
			{
				subName: 'Art and Rewards',
        link: '/art-rewards',
			},
		],
		id: '13',
		subLinkId: 'nftList',
	},
	{
		name: 'Treasure',
		icon: <TreasureIcon />,
    link: '/treasure',
		subItems: [],
		id: '15',
		subLinkId: '',
	},
	{
		name: 'Bounty',
		icon: <BountyIcon />,
    link: '/bounties',
		subItems: [],
		id: '14',
		subLinkId: '',
	},
	{
		name: 'Trove',
		icon: <TroveIcon />,
    link: '/trove',
		subItems: [],
		id: '21',
		subLinkId: '',
	},
	{
		name: 'Mine',
		icon: <MineIcon />,
    link: '/mine',
		subItems: [],
		id: '17',
		subLinkId: '',
	},
	{
		name: 'Gems',
		icon: <GemsIcon />,
		subItems: [],
		id: '202020',
		subLinkId: '',
    link: '/gems',
	},
	{
		name: 'Blog',
		icon: <BlogIcon />,
		subItems: [],
		id: '20',
		subLinkId: '',
    link: '/blog',
	},
	{
		name: 'Merch',
		icon: <MerchIcon />,
		subItems: [],
		id: '18',
		subLinkId: '',
    link: '/merch',
	},
	{
		name: 'Media',
		icon: <MediaIcon />,
		subItems: [],
		id: '22',
		subLinkId: '',
    link: '/media',
	},
	{
		name: 'Platform Roadmap',
		icon: <PlatformRoadmapIcon />,
    link: '/platform-roadmap',
		subItems: [],
		id: '99',
		subLinkId: '',
	},
];

const Hamburger = () => {
  const location = useLocation();
	const [activeItem, setAvtiveItem] = useState(location.pathname);

	const handleClickSettings = () => {
		const hamburger = document.querySelector('.hamburger'),
			rightArea = document.querySelector('.right-area'),
			footer = document.querySelector('.footer__block');

		if (hamburger.classList.contains('closed') && window.innerWidth > 768) {
			hamburger.classList.remove('closed');
			hamburger.classList.remove('closedButton');
			rightArea.classList.remove('closedMain');
			footer.classList.remove('closedMain');
		} else if (window.innerWidth >= 425 && window.innerWidth <= 768) {
			rightArea.classList.add('lwr');
			footer.classList.add('ccc');
			hamburger.classList.add('closed');
			hamburger.classList.add('closedButton');
			rightArea.classList.add('closedMain');
			footer.classList.add('closedMain');
		}
	};

	return (
		<div className={`hamburger`}>
			<div className='hamburger__header'>
				<Toggle isMobile />
				<div className='hamburger__item' id='2233'>
					<a href='#' className='linkto'>
						<LanguageIcon />
					</a>
				</div>
				<div className='hamburger__item' id='1919'>
					<a href='#' className='linkto'>
						<SettingsIcon />
					</a>
				</div>
			</div>
			<div className='hamburger__menu'>
				{hamburgerItems.map((item) => (
					<HamburgerItem
						{...item}
						key={item.name}
						activeLink={activeItem}
						onClickItemHandle={setAvtiveItem}
					/>
				))}
			</div>
			<div className='hamburger__footer'>
				<div className='hamburger__footer-settings'>
					<div className='hamburger__item nn' id='23'>
						<a href='#' className='linkto'>
							<LanguageIcon />
						</a>
					</div>
					<div className='hamburger__item nn' onClick={handleClickSettings}>
						<a href='#' className='linkto'>
							<SettingsIcon />
						</a>
					</div>
					<Toggle />
				</div>
				<div className='hamburger__links'>
					<div className='links'>
						<div className='links'>
							{links.map(({ href, logo }) => (
								<a href={href} key={href} target='_blank'>
									{logo}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hamburger;
