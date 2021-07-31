import React, { Fragment, useState, useEffect } from 'react';
import TreasureBoxes from '../../common/TreasureBoxes';
import ModifierSwiper from '../../common/ModifierSwiper';
import HuntSection from './HuntSection';
import PopupModal from '../../common/PopupModal';
import ModifierModal from '../../common/ModifierModal';
import TreasureModal from '../../common/TreasureModal';
import * as Icons from '../../components/SVGCollection';

function Treasure() {
	const [isNotLoginPopupActive, setNotLoginPopupActive] = useState(false);
	const [isModifierModalActive, setModifierModalActive] = useState(false);
	const [modifierModalData, setModifierModalData] = useState(null);
	const [isTreasureModalActive, setTreasureModalActive] = useState(false);
	const [treasureModalData, setTreasureModalData] = useState(null);
	const [swiper, setSwiper] = useState(null);
	const [totalModifiers, setTotalModifiers] = useState(0);

	const handleSwiperClick = (data) => {
		setModifierModalData(data);
		setModifierModalActive(true);
	};

	const handleTreasureClick = (data) => {
		setTreasureModalData(data);
		setTreasureModalActive(true);
	};

	useEffect(() => {
		if (isNotLoginPopupActive || isModifierModalActive || isTreasureModalActive) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
	}, [isNotLoginPopupActive, isModifierModalActive, isTreasureModalActive]);

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

	return (
		<>
			<div className='newd__container'>
				<div className='newd__main-header'>Treasure</div>
				<HuntSection onLoginPopupShow={() => setNotLoginPopupActive(true)} />
				<div className='newd__use_case__title newd__violet__text'>Loaded Modifiers</div>
				<section className='section section-modifier'>
					<div className='total-modifier my-3'>
						<div className='text-center newd__modifier__total'>
							Total of all modifiers: <strong>{totalModifiers}</strong>
						</div>
					</div>
          <div className='newd___contasdasd'>
          <div
							className='button button-icon newd__modifier__arrow'
							onClick={handleSwiperPrev}
						>
							<Icons.ArrowLeftIcon className='newd__mod__arrow'/>
							<Icons.ArrowLeftBlueIcon className='newd__mod__arrow_b'/>
						</div>

					<div className='modifier-swiper my-3 newd__modifier__container'>
						<div className='newd__modifier_swiper_container'>
							<ModifierSwiper
								setSwiper={setSwiper}
								onItemClick={handleSwiperClick}
								onTotalChange={setTotalModifiers}
							/>
						</div>

					</div>
          <div
							className='button button-icon newd__modifier__arrow'
							onClick={handleSwiperNext}
						>
							<Icons.ArrowRightIcon className='newd__mod__arrow'/>
							<Icons.ArrowRightBlueIcon className='newd__mod__arrow_b'/>
						</div>

          </div>
				</section>

				<div className='newd__use_case__title newd__violet__text'>Treasure box</div>
				<section className='section newd__section-treasure-box section-treasure-box'>
					{/* <div className='section-header'>
							<div className='section-header-inner'>
								<button className='button-icon button-refresh'>
									<i className='fas fa-sync-alt'></i>
								</button>
							</div>
						</div> */}
					<TreasureBoxes onItemClick={handleTreasureClick} />
				</section>
			</div>
			<PopupModal
				isActive={isNotLoginPopupActive}
				onClose={() => setNotLoginPopupActive(false)}
				okLabel='OK'
			>
				You need to login first.
			</PopupModal>

			<ModifierModal
				isActive={isModifierModalActive}
				data={modifierModalData}
				onClose={() => setModifierModalActive(false)}
			></ModifierModal>

			<TreasureModal
				isActive={isTreasureModalActive}
				data={treasureModalData}
				onClose={() => setTreasureModalActive(false)}
			></TreasureModal>
		</>
	);
}

export default Treasure;
