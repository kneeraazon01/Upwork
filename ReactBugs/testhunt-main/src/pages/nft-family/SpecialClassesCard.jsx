import React from 'react';
import CommonCard from '../../common/CommonCard';

const SpecialClassesCard = ({ title, tokenType, symbol, text }) => {
	return (
		<CommonCard className='newd__cases__card__container '>
			<div className='newd__company__card__left_container__title newd__cases__title'>
				{title}
			</div>
			<div className='newd__text__p newd___spc'>
				<div>
					<p>
						<strong> Token Type: </strong>
					</p>
          <p>
						<strong>Symbol: </strong>
					</p>
				</div>
				<div>
					<p>{tokenType}</p>
					<p>{symbol}</p>
				</div>
			</div>
			<div className='newd__company__card__text newd__text__center newd__text__left__cases'>
				<p className='newd___p___spec___case__text'>{text}</p>
				<br />

				<p>
					For more details see{' '}
					<a href='#' className='newd__phase__text__blue newd__text__underscore'>
						<br />
            ‘How to Play’ in ‘Treasure’
					</a>
				</p>
			</div>
		</CommonCard>
	);
};

export default SpecialClassesCard;
