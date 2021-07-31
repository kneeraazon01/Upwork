import React from 'react';
import CommonCard from './UseCaseCard';
import ReasonCard from './ReasonCard';
import CompanyCard from './CompanyCard';
import SafuCard from './SafuCard';
import * as Icons from '../../components/SVGCollection';
import indoEx from '../../img/IndoEx.png';
import pancakeswa from '../../img/pancakeswa.png';
import quillhash from '../../img/quillhash.png';
import unicrypt from '../../img/unicrypt.png';
import btdmdLogoSmall from '../../img/btdmd-logo-small.svg';

const useCaseCards = [
	{
		icon: <Icons.ExelentLiquidityIcon />,
		content:
			'Exelent liquidity: No large team wallet, 97% of tokens added to liquidity at launch',
	},
	{
		icon: <Icons.LiquidityLockedIcon />,
		content: 'Liquidity locked: 50% for 1 year, 25% for three months, 25% for one month',
		isUndelineContent: true,
	},
	{
		icon: <Icons.AuditedIcon />,
		content: 'Audited: Audit by top audit company QuillHash',
		isUndelineContent: true,
	},
	{
		icon: <Icons.NotSaleIcon />,
		content: 'No presale: Fair launched on 1 May 2021',
	},
	{
		icon: <Icons.MaxTransactionIcon />,
		content: 'Max transaction, anti-whale: Maximum transaction size of 210,000 tokens',
	},
	{
		icon: <Icons.MoneyHandIcon />,
		content: '21,000,000 maximum supply, 97% added to liquidity',
	},
	{
		icon: <Icons.GiftIcon />,
		content:
			'Expanding utility - the world’s FIRST algorithmically generated NFT with insant prizes and a huge jackpot',
	},
	{
		icon: <Icons.ProcentIcon />,
		content:
			' 4% of every on-chain transaction is distributed to holders in proportion to their holding. There is no token burn.',
	},
	{
		icon: <Icons.MedalIcon />,
		content:
			'Ambitious build program with a proven track record of delivery. Constant community rewards',
	},
];

const reasonCards = [
	{
		title: 'Community NFTs',
		content:
			'Be rewarded for your contribution with NFT rewards, unique items of art delivered to you FOR FREE which also give benefits across the platform.',
	},
	{
		title: 'BitDiamond’s first job is as a decentralised store of value on BSC ',
		content: (
			<>
				We aim to be the Bitcoin of BSC! But BitDiamond is also our platform utility token
				that provides you with benefits on all our current and future DAPPS:
				<br />
				<br />
        <p>
				• TreasureHunt
        </p>
        <p>
				• Bounties
        </p>
        <p>
				• Trove
        </p>
				<p>
				• Staking
        </p>
        <p>• Gems
        </p>
			</>
		),
	},
	{
		title: 'Treasure hunt',
		content:
			'Play TreasureHunt  for your chance at the grand prize. This prize started at 1,000,000 BitDiamond and grows every day! Just by holding BitDiamond you gain an advantage on every NFT minting. That’s right, every time you enter you get a guaranteed unique NFT. Head over the TreasureHunt to find out more about the games that will be blowing up on BSC.',
	},
	{
		title: 'Your own NFTs',
		content:
			'If you hold BitDiamond we won’t charge you anything to use this DAPP. Not a cent, satoshi, wei or simolean. You just need to pay the gas. If you don’t hold BitDiamond there is a small charge for this service.',
	},
	{
		title: 'Daily Bounty prizes',
		content:
			'Claim daily Bounty prizes for your collection of BitDiamondTreasure. The better your collection the better your chances of taking away an instant prize in BNB. The rarer your NFTs the bigger the prize.',
	},
	{
		title: 'Exchanges and Auto-distribution',
		content:
			'You do not need to do anything to receive a share of the 4% distribution, but your tokens must be held in your own wallet. Centralised exchanges (e.g., binance, coinbase) will not pass on any distribution to balances held on hot wallets at the exchange. ',
	},
];

const buyOnCards = [
	{
		title: 'Pancakeswap',
		icon: (
			<div
				style={{
					width: 50,
					height: 50,
					alignItems: 'center',
					justifyContent: 'center',
					display: 'flex',
					borderRadius: 100,
					backgroundColor: 'white',
					// border: 'solid 2px black'
				}}
			>
				<img
					src={pancakeswa}
					style={{
						alignSelf: 'center',
						display: 'flex',
					}}
					alt='#'
				/>
			</div>
		),
	},
	{
		title: 'Indoex',
		icon: (
			<img
				style={{
					alignSelf: 'center',
					display: 'flex',
				}}
				src={indoEx}
				alt='#'
			/>
		),
	},
];

const moreInfoCards = [
	{
		title: 'Unicrypt (locked liquidity)',
		icon: (
			<img
				style={{
					alignSelf: 'center',
					display: 'flex',
				}}
				src={unicrypt}
				alt='#'
			/>
		),
	},
	{
		title: 'Quillhash (audit) ',
		icon: (
			<img
				style={{
					alignSelf: 'center',
					display: 'flex',
				}}
				src={quillhash}
				alt='#'
			/>
		),
	},
];

const safuCards = [
	{
		content: [
			{
				colorPhrase: 'Liquidity swipe: ',
				variant: true,
				text: (
					<>
						When you add liquidity you get liquidity tokens, and these can be exchanged
						for their share of the liquidity pool at any time. In this type of rugpull
						the dev team simply drains the liquidity pool and runs away. With nothing in
						the pool you can no longer sell your tokens.
						<br />
						<br />
						How to avoid it: Only buy projects where liquidity is locked or the
						liquidity tokens themselves have been burned.
					</>
				),
			},
			{
				colorPhrase: 'Hint: ',
				text: `BitDiamond liquidity tokens were locked at launch for one year, three months and one month. The ability to list at exchanges depends on being able to move liquidity on to those exchanges. Therefore 100% of liquidity can’t all be locked at all times.`,
			},
		],
	},
	{
		content: [
			{
				colorPhrase: 'Coin dump: swipe: ',
				variant: true,
				text: (
					<>
						The dev team has a large token balance from the beginning, which they sell
						all at once, dumping the price.
						<br />
						<br />
						How to avoid it: Be very cautious of projects that have a large team
						balance. Ideally a very high percentage of tokens was added to liquidity at
						launch.
					</>
				),
			},
			{
				colorPhrase: 'Hint: ',
				text: `97% of BitDiamond tokens were added to liquidity at launch. We've retained 3% for promotion and marketing purposes. Check BSCScan to see the initial liquidity load.`,
			},
		],
	},
	{
		content: [
			{
				colorPhrase: 'Public mint function: ',
				variant: true,
				text: (
					<>
						The contract has a public mint function that allows the dev team to mint a
						LOT of new tokens and sell them, dumping the price.
						<br />
						<br />
						How to avoid it: Always check the ‘write’ section of a smart contract to
						check there is no public mint function.
					</>
				),
			},
			{
				colorPhrase: 'Hint: ',
				text: `BitDiamond has no public mint function. Check out the writeable calls on the contract in BSCScan.`,
			},
		],
	},
	{
		content: [
			{
				colorPhrase: 'Exploits: ',
				variant: true,
				text: (
					<>
						This is where a vulnerability in the smart contract is exploited by hackers.
						<br />
						<br />
						How to avoid it: Look for smart contracts that have completed security
						audits of their code before they launch. This means independent security
						professionals have reviewed the code quality of the smart contract.
					</>
				),
			},
			{
				colorPhrase: 'Hint: ',
				text: `BitDiamond has been audited by QuillHash, one of the best audit companies in the business.`,
			},
		],
	},
];

const About = () => {
	return (
		<div className='newd__container'>
			<div id='/about'></div>
			<div className='newd__main-header newd__main-header__hid'>About BitDiamond</div>
			<div className='newd__main-header newd__header__logo'>
				About <img src={btdmdLogoSmall} alt='logo' />
			</div>
			<div className='newd__use_case__title anim-items'>Use case and key features</div>
			<div className='newd__use_case__items'>
				{useCaseCards.map((card) => (
					<CommonCard {...card} />
				))}
			</div>
			<div className='newd__use_case__title newd__violet__text anim-items'>
				Hold something that will genuinely grow
			</div>
			<div className='newd__common__text__container'>
				There are a lot of tokens out there, which one do you chose? Most have tokenomics
				that are good to HODL. BitDiamond has that, with a 4% tax on all on-chain
				transactions that is distributed to all holders. It’s frictionless yield,
				non-custodial staking, money for nothing. But you deserve more than that. You
				deserve a token that actually DOES something, and which is backed by a dev team that
				will build the value of what you hold, not just aim to pump the price.
				<p>
					In this regard BitDiamond is unique. It has non-custodial staking combined with
					a sensible total volume of 21 million tokens. Not billions or trillions. There
					was no automatic burn at launch, so the percentage holdings you see at BSCScan
					are all legitimate. We also don’t plan any manual burns, and the supply is fixed
					– the smart contract does not allow any additional tokens to be minted after the
					initial minting on go-live.
				</p>
				But that’s just the beginning. BitDiamond is our platform token that delivers
				benefits on our expanding array of dapps and crypto infrastructure. It’s a token
				that has great HODL tokenomics PLUS genuine utility that will encourage others to
				buy and hold to make use of the BitDiamond platform. Hold BitDiamond in your wallet
				to get an advantage when minting BitDiamondTreasure, the world’s first
				algorithmically generated NFT with daily and jackpot prizes and direct integration
				to a fiction project. This is crypto like you have never seen before! Stake your
				BitDiamond to double that advantage! Be active in our community and earn yourself
				ranking NFTs that, guess what, also give you benefits across our entire platform.
				Welcome to BitDiamond, the future’s exciting!
			</div>
			<div className='newd__use_case__title newd__violet__text anim-items'>
				Reasons to Buy and Hold
			</div>
			<div className='newd__reason__items__container'>
				<span className='newd__reason__items'>
					<ReasonCard {...reasonCards[0]} />
					<ReasonCard {...reasonCards[1]} />
				</span>
				<span className='newd__reason__items'>
					<ReasonCard {...reasonCards[2]} />
					<ReasonCard {...reasonCards[3]} />
					<ReasonCard {...reasonCards[4]} />
				</span>
				<span className='newd__reason__items'>
					<ReasonCard {...reasonCards[5]} />
				</span>
			</div>
			<div className='newd__use_case__title newd__violet__text anim-items' id='/links'>
				Links
			</div>
			<div className='newd__text__block__block newd__text__block__block__max'>
				<div className='newd__text__content__block'>
					<div className='newd__text__block'>Buy on: </div>
					<div className='newd__text__items'>
						{buyOnCards.map((card) => (
							<CompanyCard {...card} />
						))}
					</div>
				</div>
				<div className='newd__text__content__block'>
					<div className='newd__text__block'>More information: </div>
					<div className='newd__text__items'>
						{moreInfoCards.map((card) => (
							<CompanyCard {...card} />
						))}
					</div>
				</div>
			</div>
			<div className='newd__text__block__block newd__text__block__block__min'>
				<div className='newd__text__content__block'>
					<div className='newd__text__items'>
						{buyOnCards.map((card) => (
							<CompanyCard {...card} title={`Buy on: ${card.title}`} />
						))}
					</div>
				</div>
				<div className='newd__text__content__block'>
					<div className='newd__text__items'>
						{moreInfoCards.map((card) => (
							<CompanyCard {...card} />
						))}
					</div>
				</div>
			</div>
			<div className='newd__use_case__title newd__violet__text anim-items' id='/safu'>
				Staying SAFU
			</div>
			<div className='newd__text__content__blue newd__text__content__blue__light'>
				How do you decide whether to buy a token or not? Why do projects fail? Looking
				around the market and there are two main reasons for project failure: rugpulls and
				exploits. So how do you avoid these?
			</div>
			<div className='newd__safu__items'>
				{safuCards.map((card) => (
					<SafuCard {...card} />
				))}
			</div>
			<div className='newd__text__content__blue newd__text__content__blue__light'>
				Crypto is high-risk, staying totally SAFU is impossible. But by following the above
				guidance, and at least being aware of the risks, you are ahead of the game. There
				are also some tools out there to help. Checkout Poocoin’s Ape feature for example,
				which gives guidance on how to ape in more safely.
				<br />
				<br />
				Checkout our Staying SAFU series on our blog and also our regular spot on crypto
				fundamentals, CryptoBits.
			</div>
		</div>
	);
};

export default About;
