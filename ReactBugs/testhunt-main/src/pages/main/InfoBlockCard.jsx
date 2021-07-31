import React from 'react';

const InfoBlockCard = ({ isComingSoon = false, subTittle, children, cardId = '' }) => {
	return (
		<div className={`item ${isComingSoon ? 'coming_soon' : ''}`} id={cardId}>
			<div className={`title ${isComingSoon ? 'violet' : ''}`}>
				{isComingSoon ? 'coming soon' : 'Live'}
			</div>
			<div className='info'>
				<div className={`tt anim-items ${isComingSoon ? '' : 'one-time-animation'}`}>
					<span className={`${isComingSoon ? '' : 'dark_blue'}`}>{subTittle}</span>
					{children}
				</div>
			</div>
		</div>
	);
};

export default InfoBlockCard;
