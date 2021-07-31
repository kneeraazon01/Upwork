import React from 'react';
import CommonCard from '../../common/CommonCard';

const RewardCard = ({ img = null, title, tokenType, symbol, text }) => {
	return (
		<CommonCard className='newd__reward__card__container'>
			<div className='newd__company__card__left_container'>
				<img className='newd__company__card__img' src={img} alt='#' />
				<span>
					<div className='newd__company__card__left_container__title'>{title}</div>
					<div className='newd__company__card__left_container__subtitle newd__company__card__subtitle__hidden'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
							</p>
							<p>
								<strong>Symbol: </strong>
							</p>
						</div>
						<div className='newd__company__card__left_container__left__text'>
							<p> {tokenType}</p>
							<p>{symbol}</p>
						</div>
					</div>
					<div className='newd__company__card__left_container__subtitle newd__company__card__subtitle__visible'>
						<div className='newd__company__card__left_container__left__text'>
							<p>
								<strong> Token Type: </strong>
                <p> {tokenType}</p>
							</p>
							<p>
								<strong>Symbol: </strong>
								<p>{symbol}</p>
							</p>
						</div>
					</div>
				</span>
			</div>
			<div className='newd__company__card__text'>
				<p>{text}</p>
				<br />
				<p>Adds +1% in BitDiamond TreasureHunt</p>
			</div>
		</CommonCard>
	);
};

export default RewardCard;
