import React, { useEffect, useContext, useState } from 'react';
import { LoadingCard } from './LoadingCards';
import { MoralisContext } from '../context/MoralisContext';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import CommonCard from './CommonCard';

const modules = import.meta.globEager('../img/modifiers/**/**.png');

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function ModifierItem({ data, onItemClick }) {
	const imgsrc = '../img/modifiers/' + data.image + '.png';
	const img = modules[imgsrc] ? modules[imgsrc].default : '';

	return (
		<div className='card-list-item treasure-box-item'>
			<div className='group-item-inner'>
				<CommonCard className='newd__bounty__item__container newd__bounty__item__container__mod'>
					<div onClick={onItemClick}>
						<h1 className='newd__card___title__modif'>{data.category}</h1>
						<div className='group-item-inner'>
							<img className='newd___card__image' src={img} width='160' height='225' />
						</div>
					</div>
				</CommonCard>
			</div>
		</div>
	);
}

export default (props) => {
	const { fetchingModifier, modifierItems } = useContext(MoralisContext);

  useEffect(async () => {
		let total = 0;
		modifierItems.map((data) => (total += data.modifierScore));
		total = total || modifierItems.length;
		props.onTotalChange(total);
	}, [modifierItems]);

	if (fetchingModifier) return null;

	return (
		<Swiper
			// navigation

			onInit={(swiper) => {
				props.setSwiper(swiper);
			}}
			pagination={{ clickable: true }}
			breakpoints={{
				320: {
					slidesPerView: 2,
				},
				640: {
					slidesPerView: 1,
				},
				860: {
					slidesPerView: 1,
				},
				1024: {
					slidesPerView: 3,
				},
				1280: {
					slidesPerView: 4,
				},
				1366: {
					slidesPerView: 4,
          spaceBetween: 0,
				},
			}}
		>
			{fetchingModifier
				? [...Array(4)].map((x, i) => (
						<SwiperSlide key={`fake-${i}`}>
							<LoadingCard />
						</SwiperSlide>
				  ))
				: modifierItems.map((data, i) => (
						<SwiperSlide key={i}>
							<ModifierItem data={data} onItemClick={props.onItemClick} />
						</SwiperSlide>
				  ))}
		</Swiper>
	);
};
