import React from 'react';
import * as Icons from '../../components/SVGCollection';

const PlatformRoadmap = () => {
	return (
		<div className='newd__container'>
			<div className='newd__main-header newd__roadmap__header'>Platform roadmap</div>
			<div className='newd__use_case__title newd__violet__text'>Phase 1/4</div>
			<div className='newd__phase__container'>
				<div className='newd__phase__text__container newd___p__big__margin'>
					<p> Launch BTDMD – BitDiamond MainDiamond. BEP-20</p>
					<p>Passive yield and platform utility token.</p>
				</div>
				<Icons.Phase14Icon className='newd__phase__icon'/>
				<Icons.Phase14LIcon className='newd__phase__icon_l'/>
			</div>
			<div className='newd__use_case__title newd__violet__text'>Phase 2/4</div>
			<div className='newd__phase__container'>
				<div className='newd__phase__text__container newd___p__big__margin'>
					<p>Launch BitDiamond Universe – NFTs</p>
					<p>DAPPs</p>
					<p>Cashflow positive platform</p>
				</div>
				<Icons.Phase24Icon className='newd__phase__icon'/>
				<Icons.Phase24LIcon className='newd__phase__icon_l' />
			</div>
			<div className='newd__use_case__title newd__violet__text'>Phase 3/4</div>
			<div className='newd__phase__container'>
				<div className='newd__phase__text__container newd___p__big__margin'>
					<p>Second DAPP phase</p>
					<p>
						Most likely candidate is a series of oracles. These are far too expensive at
						the moment, the plan is for ones that cost next to nothing (if you hold
						BitDiamond, of course).
					</p>
				</div>
				<Icons.Phase34Icon className='newd__phase__icon' />
				<Icons.Phase34LIcon className='newd__phase__icon_l' />
			</div>
			<div className='newd__use_case__title newd__violet__text'>Phase 4/4</div>
			<div className='newd__phase__container'>
				<div className='newd__phase__text__container newd___p__big__margin'>
					<p>
						DAO. This is the end-state for this first stage in BitDiamond’s evolution.
					</p>
					<p>
						We will have grown it as fast and as far as we can, now it will need full
						decentralisation to truly fly.
					</p>
					<p>
						We will setup the BitDiamond DAO and watch our beautiful creation emerge
						from centralised control into a decentralised powerhouse.
					</p>
					<br />
					<a href='#' className='newd__phase__text__blue'>How big can it get? Time will tell</a>
				</div>
				<Icons.Phase44Icon />
			</div>
		</div>
	);
};

export default PlatformRoadmap;
