import React from 'react';
import {
	BitDiamondLogo,
	InstagramLogo,
	FacebookLogo,
	TelegramLogo,
	DiscordLogo,
	RedditLogo,
	GithubLogo,
	TwitterLogo,
} from './SVGCollection';

const links = [
	{
		href: 'https://www.instagram.com/btdmd/',
		logo: <InstagramLogo/>,
	},
	{
		href: 'https://www.facebook.com/BitDiamond-105486601684349',
		logo: <FacebookLogo/>,
	},
	{
		href: 'https://t.me/Official_BitDiamond',
		logo: <TelegramLogo/>,
	},
	{
		href: 'https://discord.com/invite/9zPsFBwwJB',
		logo: <DiscordLogo/>,
	},
	{
		href: 'https://www.reddit.com/r/BitDiamond/',
		logo: <RedditLogo/>,
	},
	{
		href: 'https://github.com/keyoke-code',
		logo: <GithubLogo/>,
	},
	{
		href: 'https://twitter.com/bitdmd',
		logo: <TwitterLogo/>,
	},
];

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container'>
				<div className='footer__block'>
					<div className='block'>
						<BitDiamondLogo className='footer__title' />
						<div className='footer__links'>
							{links.map(({ href, logo }) => (
								<a href={href} key={href} target='_blank'>
									{logo}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
