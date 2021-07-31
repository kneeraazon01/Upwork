import React from 'react';
import CommonCard from '../../common/CommonCard';

const ReasonCard = ({ title, content }) => {
	return (
		<CommonCard className='newd__reason_card'>
			<div className='newd__reason_card__title'>{title}</div>
			<div className='newd__reason_card__content'>{content}</div>
		</CommonCard>
	);
};

export default ReasonCard;
