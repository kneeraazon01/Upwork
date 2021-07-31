import React from 'react';
import CommonCard from '../common/CommonCard';
// import CardImage from '../img/image 22.png'

const modules = import.meta.globEager('../img/modifiers/**/**.png');

function TokenCard({
	data,
	selected,
	onItemClick = () => {},
	isShowPrize = false,
	isBigClass = false,
	isModifier = false,
}) {
	const imgsrc = '../img/modifiers/' + data.image + '.png';

  const tokenData = data?.tokenData;
	const img = isModifier ? (modules[imgsrc] ? modules[imgsrc].default : '') : tokenData.image;	
	// const img = isModifier ? (modules[imgsrc] ? modules[imgsrc].default : '') : CardImage;

	let className = 'card-list-item card-inactive';
	if (selected) className = 'card-list-item card-active';
	return (
		<CommonCard className='newd__bounty__item__container'>
			{tokenData && (
				<div onClick={onItemClick}>
				{/* <div className={className} onClick={onItemClick}> */}
					{isModifier && <h1>{data.category}</h1>}
					<div className='group-item-inner'>
						<img className='newd___card__image' src={img} alt={data.name} width='180' height='250' />
						{!isModifier && (
							<>
								{isShowPrize ? (
									<>
										<h1>{tokenData.class}</h1>
										<p>{`${tokenData.Prize.split('BNB')[0]} BNB`}</p>
									</>
								) : isBigClass ? (
									<h1>{tokenData.class}</h1>
								) : (
									<h3>{tokenData.class}</h3>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</CommonCard>
	);
}

export default TokenCard;
