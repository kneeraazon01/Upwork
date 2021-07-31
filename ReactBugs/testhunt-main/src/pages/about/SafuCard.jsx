import React from 'react';
import CommonCard from '../../common/CommonCard';

const SafuCard = ({ content }) => {
	return (
		<CommonCard className='newd__safu__card'>
			{content.map(({ colorPhrase = '', variant, text }) => (
				<div>
					<span
						className={`newd__safu__card__phrase ${
							!variant ? 'newd__safu__card__phrase__violet' : ''
						}`}
					>
						{colorPhrase}
					</span>
					<span className='newd__safu__card__content'>{text}</span>
				</div>
			))}
		</CommonCard>
	);
};

export default SafuCard;
