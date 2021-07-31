import React from 'react';
import CommonCard from '../../common/CommonCard';

const CompanyCard = ({ icon = null, title }) => {
	return (
		<CommonCard className='newd__company__card'>
			<span className='newd__company__card__icon'>{icon}</span>
			<span className='newd__company__card__text__1'>{title}</span>
		</CommonCard>
	);
};

export default CompanyCard;
