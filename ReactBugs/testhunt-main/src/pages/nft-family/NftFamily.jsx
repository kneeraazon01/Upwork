import React from 'react';
import SafuCard from '../about/SafuCard';
import * as Icons from '../../components/SVGCollection';
import RewardCard from './RewardCard';
import Supporter from '../../img/img-treasure-box-1.png';
import Protector from '../../img/modifiers/Community/BTDPRO_0.png';
import Leader from '../../img/img-modifier-1.png';
import Champion from '../../img/image 17.png';
import Hero from '../../img/image 18.png';
import Legend from '../../img/image 19.png';
import Paragon from '../../img/image 20.png';
import Chest1 from '../../img/image 21.png';
import Chest2 from '../../img/image 22.png';
import Blackhole from '../../img/image 23.png';
import Pc from '../../img/pc.png';
import Pc2 from '../../img/pc_w.png';
import SpecialClassesCard from './SpecialClassesCard';

const rewardCards = [
	{
		img: Supporter,
		title: 'BitDiamond Supporter',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDSUP',
		text: 'This is the first level, and is awarded to recognise all of those who support BitDiamond and the work we do. Thank you to all our supporters, we hope your wallet wears it BTDSUP NFT with pride!',
	},
	{
		img: Protector,
		title: 'BitDiamond Protector',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDPRO',
		text: 'BitDiamond Protectors are a powerful force for our community! This token is awarded to those who go the extra mile. If you are asked to be a mod for us you will get one of these. Likewise if you are active tweeting and retweeting your support on twitter or other social media platforms.',
	},
	{
		img: Leader,
		title: 'BitDiamond Leader',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDLDR',
		text: 'Every team has people who show the way. Who reveal their passion for all to see. Who take others with them, and refuse to see others fail. These are our BitDiamond Leaders, and we are grateful for every one.',
	},
	{
		img: Champion,
		title: 'BitDiamond Champion',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDCHM',
		text: 'To earn this award takes serious commitment. You have been with us through thick and thin and have stood out as a true champion.',
	},
	{
		img: Hero,
		title: 'BitDiamond Hero',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDHRO',
		text: 'Very few can be a hero, but when you see one there is no mistaking it. Do you have the qualities to one day rise to be a BitDiamond Hero?',
	},
	{
		img: Legend,
		title: 'BitDiamond Legend',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDLGN',
		text: 'There are few heroes in this world, and even fewer are those men and women whose names become legendary. Who’s deeds echo throughout history. These are the BitDiamond Legends!',
	},
	{
		img: Paragon,
		title: 'BitDiamond Paragon',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDPAR',
		text: 'A rank so senior to be almost mythical. Perfection.',
	},
];

const casesCards = [
	{
		title: 'BitDiamond Bounty',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDBNT',
		text: 'These tokens represent the current bounty items that can claimed. If you have a BitDiamond Treasure NFT that matches the class of a bounty item in the Bounty dapp then you can INSTANTLY claim that BNB prize money.',
	},
	{
		title: 'BitDiamond Trove',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDTRV',
		text: 'These might one day be the most valuable NFTs in the world. . . There are only nine of them, and they represent the BitDiamond Treasure NFTs that you need to claim the Trove prize. They are the nine ultimate BitDiamond Treasure Classes, the rarest of the rare in all nine colours. If you have these head to the Trove dapp and claim your prize! Go quickly, the Trove prize started at 1,000,000 BitDiamond and will grow in both BitDiamond and BNB until it is won. How big will it get?',
	},
	{
		title: 'BitDiamond Claim',
		tokenType: 'BEP-721 NFT',
		symbol: 'BTDCLM',
		text: 'If you submit a claim for the Trove you will get a BitDiamond Claim NFT, proving your claim in the best way possible – on the immutable blockchain!',
	},
];

const NftFamily = () => {
	return (
		<div className='newd__container'>
			<div className='newd__main-header'  id='/community'>NFT Family</div>
			<div className='newd__use_case__title newd__violet__text anim-items'>Community</div>
			<div className='newd___community__centered__text newd__common__text__container newd__common__text__container__left__nft newd__common__text__container__center'>
				A strong community is one of BitDiamond’s greatest assets. We recognise this with
				our community NFT rewards. The first of these rewards is our ranking NFTs. There are
				no set rules about how these are awarded, but they do represent our appreciation of
				how much our members have contributed to the BitDiamond community.
				<br />
			</div>
			<div className='newd__nft__follows newd__common__text__container__left__nft'>
				In ascending order of seniority our ranking rewards are as follows:
			</div>
			{rewardCards.map((card) => (
				<RewardCard key={card.title} {...card} />
			))}
			<div className='newd__margin'></div>
			<div className='newd__use_case__title newd__violet__text' id='/nft-trasure'>Treasure</div>
			<div className='newd__nft__treasure__container'>
				<div className='newd__phase__text__container'>
					<div className='newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDTRS</p>
						</div>
					</div>
					<p>
						BitDiamond Treasure are unique NFTs whose characteristics are determined by
						chance and the modifier cards you hold on your wallet. Each NFT is
						custom-made artwork. They can be minted in the TreasureHunt dapp and used to
						win prizes in Bounty and Trove dapp.
					</p>
					<p>
						Incentives for playing the game are both fun (how rare an NFT can you get?),
						financial (prizes!), and social (in the future NFTs will be able to be
						traded, which will be vital if anyone wants to win the Trove!).
					</p>
					<br />
					For more details see{' '}
					<a href='#' className='newd__phase__text__blue newd__text__underscore'>
						‘How to Play’ in ‘Treasure’
					</a>
				</div>
				<div>
					<img className='newd__trasure__card__img' src={Chest1} alt='#' />
					<img className='newd__trasure__card__img' src={Chest2} alt='#' />
				</div>
			</div>
			<div className='newd__nft__treasure__container__mini'>
				<div className='newd__phase__text__container'>
					<div className='newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDTRS</p>
						</div>
					</div>
				</div>
				<div>
					<img className='newd__trasure__card__img newd__trasure__card__img__chest' src={Chest1} alt='#' />
					<img className='newd__trasure__card__img newd__trasure__card__img__chest' src={Chest2} alt='#' />
				</div>
        <div className='newd__phase__text__container'>
					<p>
						BitDiamond Treasure are unique NFTs whose characteristics are determined by
						chance and the modifier cards you hold on your wallet. Each NFT is
						custom-made artwork. They can be minted in the TreasureHunt dapp and used to
						win prizes in Bounty and Trove dapp.
					</p>
					<br />
					<p>
						Incentives for playing the game are both fun (how rare an NFT can you get?),
						financial (prizes!), and social (in the future NFTs will be able to be
						traded, which will be vital if anyone wants to win the Trove!).
					</p>
					<br />
					For more details see{' '}
					<a href='#' className='newd__phase__text__blue newd__text__underscore'>
						‘How to Play’ in ‘Treasure’
					</a>
				</div>
			</div>
			<div className='newd__use_case__title newd__violet__text anim-items' id='/bts'>
				Bounty, Trove and Claim
			</div>
			<div className='newd__common__text__container newd__margin newd__common__text__container__center'>
				Three very special classes of NFTs!
			</div>
			<div className='newd__cases__container'>
				{casesCards.map((card) => (
					<SpecialClassesCard key={card.title} {...card} />
				))}
			</div>
			<div className='newd__spec__header newd__use_case__title newd__use_case__title__small newd__violet__text' id='/art-rewards'>
				<h2>Art and Rewards</h2>
			</div>
			<div className='newd__use_case__title anim-items newd__use_case__title__small'>BitDiamond Art</div>
			<div className='newd__nft__treasure__container newd__with__pc'>
				<div className='newd__phase__text__container'>
          <div className='newd__pc_ccc newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDART</p>
						</div>
					</div>
					<div className='newd__text__content__blue newd__margin'>
						Mint your own works of art into NFTs for free in the BitDiamond Gems app.
						Simple.
					</div>
				</div>
				<div>
					<img className='newd__trasure__card__img__pc newd__trasure__card__img__pc_b' src={Pc} alt='#' />
					<img className='newd__trasure__card__img__pc_w newd__trasure__card__img__pc' src={Pc2} alt='#' />
				</div>
			</div>
      <div className='newd__nft__treasure__container__mini'>
				<div className='newd__phase__text__container'>
					<div className='newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDART</p>
						</div>
					</div>
					<div className='newd__text__content__blue newd__margin newd__mobile__art'>
						Mint your own works of art into NFTs for free in the BitDiamond Gems app.
						Simple.
					</div>
				</div>
				<div className='newd__trasure__card__img__container'>
					<img className='newd__trasure__card__img__pc newd__trasure__card__img__pc_b' src={Pc} alt='#' />
					<img className='newd__trasure__card__img__pc newd__trasure__card__img__pc_w' src={Pc2} alt='#' />
				</div>
			</div>
			<div className='newd__margin'></div>
			<div className='newd__use_case__title anim-items newd__use_case__title__small'>BitDiamond Rewards</div>
			<div className='newd___spec__2 newd__text__content__blue newd__text__center newd__text__left__cases'>
				We like making things, and we like rewarding our community! From time to time we’ll
				make something new and exciting and give it away. So far we have had our Genesis
				Token giveaway for everyone that bought BitDiamond within 2 days of launch. Stay
				tuned, and HODL your BitDiamond, for more surprise rewards.
			</div>
			<div className='newd__margin'></div>
			<div className='newd__use_case__title newd__use_case__title__small anim-items'>BitDiamond Genesis</div>
			<div className='newd__nft__treasure__container'>
				<div className='newd__phase__text__container'>
					<div className='newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDART</p>
						</div>
					</div>
					<div className='newd__text__content__blue newd__margin'>
						There will only ever be 37 of these.
						<br />
						If you hold one, you know.
					</div>
						<br />

					<p>Adds +3% in BitDiamond TreasureHunt.</p>
				</div>
				<div>
					<img className='newd__trasure__card__img' src={Blackhole} alt='#' />
				</div>
			</div>
      <div className='newd__nft__treasure__container__mini'>
				<div className='newd__phase__text__container'>
					<div className='newd__company__card__left_container__subtitle newd__trasure__card__subcon'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p>BEP-721 NFT</p>
							<p>BTDART</p>
						</div>
					</div>
				</div>
				<div className='newd__trasure__card__img__container'>
					<img className='newd__trasure__card__img__universe' src={Blackhole} alt='#' />
				</div>
        <div className='newd__phase__text__container'>
					<div className='newd__text__content__blue newd__margin newd__mobile__art'>
						There will only ever be 37 of these.
						If you hold one, you know.
					</div>
					<p className='newd__mobile__text__common'>Adds +3% in BitDiamond TreasureHunt.</p>
				</div>
			</div>
			<div className='newd__margin'></div>
			<div className='newd__margin'></div>
		</div>
	);
};

export default NftFamily;
