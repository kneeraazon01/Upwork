import React from 'react';
import CommonCard from '../../common/CommonCard';

const UseCaseCard = ({ icon = null, content, isUndelineContent }) => {
	return (
		<CommonCard className='newd__use_case__card'>
			<span className='newd__use_case__item__icon'>{icon}</span>
			<span className={`newd__use_case__item__text ${isUndelineContent ? 'newd__use_case__item__text__under' : ''}`}>{content}</span>
		</CommonCard>
	);
};

export default UseCaseCard;
