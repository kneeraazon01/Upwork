import React, { useState, useEffect, useContext } from 'react';
import ModifierSwiper from '../../common/ModifierSwiper';
import ModifierModal from '../../common/ModifierModal';
import PopupModal from '../../common/PopupModal';
import { MoralisContext } from '../../context/MoralisContext';
import { getUserBalances, stakeAmount, unstakeAmount } from '../../utils/stakingintegration';
import CommonCard from '../../common/CommonCard';
import CommonButton from '../../common/CommonButton';
import * as Icons from '../../components/SVGCollection';
import RangeInput from './RangeInput';
import NumberInput from './NumberInput';

export default () => {
	const [isModifierModalActive, setModifierModalActive] = useState(false);
	const [modifierModalData, setModifierModalData] = useState(null);
	const [swiper, setSwiper] = useState(null);
	const [totalModifiers, setTotalModifiers] = useState(0);
	const { moralis, user, fetchModifierItems } = useContext(MoralisContext);
	const [balance, setBalance] = useState(0);
	const [unstakedBalance, setUnstakedBalance] = useState(0);

	const [stakeAmountInput, setStakeAmountInput] = useState(0);
	const [unstakeAmountInput, setUnstakeAmountInput] = useState(0);

	const [isStaking, setIsStaking] = useState(false);
	const [isUnstaking, setIsUnstaking] = useState(false);

	const chooser = [0, 25, 50, 75, 100];

	const handleSwiperClick = (data) => {
		setModifierModalData(data);
		setModifierModalActive(true);
	};

	const handleSwiperPrev = () => {
		if (swiper) {
			swiper.slidePrev();
		}
	};

	const handleSwiperNext = () => {
		if (swiper) {
			swiper.slideNext();
		}
	};

	useEffect(() => {
		if (isModifierModalActive) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
	}, [isModifierModalActive]);

	const fetchBalance = async () => {
		if (!moralis) {
			return;
		}
		window.web3 = await moralis.Web3.enable();
		const balances = await getUserBalances(moralis);
		if (balances) {
			setBalance(balances.userBTDMDBalance);
			setUnstakedBalance(balances.userStakedBalance);
		}
	};

	useEffect(async () => {
		fetchBalance();
	}, [moralis]);

	const handleStake = async () => {
		try {
			await stakeAmount(moralis, stakeAmountInput);
			fetchModifierItems();
			setIsStaking(true);
			setStakeAmountInput(0);
			fetchBalance();
		} finally {
		}
	};

	const handleUnstake = async () => {
		try {
			await unstakeAmount(moralis, unstakeAmountInput);
			fetchModifierItems();
			setIsUnstaking(true);
			setUnstakeAmountInput(0);
			fetchBalance();
		} finally {
		}
	};

	return (
		<div className='newd__container'>
			<div className='newd__main-header'>Staking</div>
			<div className='newd__use_case__title newd__violet__text'>Stake</div>
			<CommonCard className='newd__miner__card__container'>
				<form className='newd__form__mine'>
					<div className='newd__miner__wallet__container'>
						<Icons.WalletIcon />
						<label className='newd__balance__label'>
							Balance in wallet:{' '}
							<span className='newd__form__mine__blue'>
								{!user
									? 'Please sign-in to see balances'
									: Number(balance)
											.toFixed(5)
											.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							</span>
						</label>
					</div>
					<div className='form-group'>
						<label>Stake</label>
						<NumberInput
							min='0'
							max={balance}
							value={stakeAmountInput}
							onChange={(e) => setStakeAmountInput(e.target.value)}
						/>
						<span className='input-percentage-symbol'>tokens</span>
					</div>
					<div className='form-inner-vertical'>
						<RangeInput
							min='0'
							max='100'
							value={balance ? (stakeAmountInput / balance) * 100 : 0}
							onChange={(e) =>
								setStakeAmountInput(Math.floor((e.target.value / 100) * balance))
							}
						/>
					</div>
					<div className='button-percentage-group newd__button__percentage__group'>
						{chooser.map((data) => (
							<button
								type='button'
								key={data}
								onClick={() =>
									setStakeAmountInput(Math.floor((data / 100) * balance))
								}
								className={
									'newd__form__mine__button__percentage' +
									(Number((stakeAmountInput / balance) * 100).toFixed(0) == data
										? ' active'
										: '')
								}
							>
								{data}%
							</button>
						))}
					</div>
					<div className='newd__form__mine__btn'>
						<CommonButton
							onClick={handleStake}
							disabled={!user}
							// className='button-stake my-2'
						>
							Stake
						</CommonButton>
					</div>
				</form>
			</CommonCard>
			<div className='newd__use_case__title newd__violet__text newd___unstake__header'>Unstake</div>
			<CommonCard className='newd__miner__card__container'>
				<form className='newd__form__mine'>
					<div className='newd__miner__wallet__container'>
						<Icons.WalletIcon />
						<label className='newd__balance__label'>
							Balance currently staked:{' '}
							<span className='newd__form__mine__blue'>
								{!user
									? 'Please sign-in to see balances'
									: Math.floor(unstakedBalance)
											.toFixed(5)
											.replace(/\d(?=(\d{3})+\.)/g, '$&,')}
							</span>
						</label>
					</div>
					<div className='form-group'>
						<label>Unstake</label>
						<NumberInput
							min='0'
							max={unstakedBalance}
							value={unstakeAmountInput}
							onChange={(e) => setUnstakeAmountInput(e.target.value)}
						/>
						<span className='input-percentage-symbol'>tokens</span>
					</div>
					<div className='form-inner-vertical'>
						<RangeInput
							min='0'
							max='100'
							value={
								unstakedBalance ? (unstakeAmountInput / unstakedBalance) * 100 : 0
							}
							onChange={(e) =>
								setUnstakeAmountInput(
									Math.floor((e.target.value / 100) * unstakedBalance)
								)
							}
						/>
					</div>
					<div className='button-percentage-group newd__button__percentage__group'>
						{chooser.map((data) => (
							<button
								type='button'
								key={data}
								onClick={() =>
									setUnstakeAmountInput(
										Math.floor((data / 100) * unstakedBalance)
									)
								}
								className={
									'newd__form__mine__button__percentage' +
									(Number((unstakeAmountInput / unstakedBalance) * 100).toFixed(
										0
									) == data
										? ' active'
										: '')
								}
							>
								{data}%
							</button>
						))}
					</div>
					<div className='newd__form__mine__btn'>
						<CommonButton onClick={handleUnstake} disabled={!user}>
							Unstake
						</CommonButton>
					</div>
				</form>
			</CommonCard>

			{/* <section className='section-treasure-box-alt pb-5'>
					<div className='container grey'>
						<div className='section-header'>
							<div className='section-header-inner'>
								<div className='section-title flex-grow mt-3'>
									<h2 className='no-bg text-center'>Modifier Earned</h2>
								</div>
								<div className='section-swiper-nav'>
									<button
										className='button button-icon'
										onClick={handleSwiperPrev}
									>
										<i className='fas fa-arrow-left'></i>
									</button>
									<button
										className='button button-icon'
										onClick={handleSwiperNext}
									>
										<i className='fas fa-arrow-right'></i>
									</button>
								</div>
							</div>
						</div>
						<div className='modifier-swiper my-3'>
							<ModifierSwiper
								setSwiper={setSwiper}
								onItemClick={handleSwiperClick}
								onTotalChange={setTotalModifiers}
							/>
						</div>
						<div className='total-modifier my-3'>
							<h3 className='text-center'>
								Total of all modifiers: <span>{totalModifiers}</span>
							</h3>
						</div>
					</div>
				</section> */}
			<ModifierModal
				isActive={isModifierModalActive}
				data={modifierModalData}
				onClose={() => setModifierModalActive(false)}
			></ModifierModal>

			<PopupModal isActive={isStaking} okLabel='OK' onClose={() => setIsStaking(false)}>
				BitDiamond Staked
			</PopupModal>
			<PopupModal isActive={isUnstaking} okLabel='OK' onClose={() => setIsUnstaking(false)}>
				BitDiamond Unstaked
			</PopupModal>
      <div className='newd__last__space'></div>
		</div>
	);
};
