import React from 'react';

const MissionCard = ({ title, info, cardId }) => {
	return (
		<div className='item' id={cardId}>
			<div className='title anim-items'>{title}</div>
			<div className='info anim-items one-time-animation'>{info}</div>
		</div>
	);
};

export default MissionCard;
