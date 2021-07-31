import React, { useContext, useEffect, useState } from 'react';
import { MoralisContext } from '../../context/MoralisContext';
import hunt from './hunt';
import CommonButton from '../../common/CommonButton';

export default (props) => {
	const { moralis, user } = useContext(MoralisContext);
	const [huntCount, setHuntCount] = useState([
		{
			allTimeHunts: 0,
		},
		{
			todayHunts: 0,
		},
	]);

	const huntButtonsData = [
		{
			label: 'Hunt 1',
			price: '0.00006BNB',
			value: 6000000000,
		},
		{
			label: 'Hunt 10',
			price: '0.0006BNB',
			value: 60000000000,
		},
		{
			label: 'Hunt 20',
			price: '0.0012BNB',
			value: 120000000000,
		},
		{
			label: 'Hunt 40',
			price: '0.0024BNB',
			value: 240000000000,
		},
	];

	const handleHuntButton = (priceValue) => {
		if (!user) {
			props.onLoginPopupShow();
			return;
		}

		hunt(moralis, priceValue);
	};

	useEffect(async () => {
		if (!moralis) {
			return;
		}
    try {
      const response = await moralis.Cloud.run('getHuntCount');
      setHuntCount(response);        
    } catch (error) {
      console.log(error);
    }
	}, [moralis]);

	return (
		<>
			<div className='hunt-stat-container'>
				<div className='hunt-stat newd__hunt__section__counter'>
					<dd className='counter' style={{ '--real-num': huntCount[1].todayHunts }}></dd>
					<dt>
						Hunts in past <strong>24 hours</strong>
					</dt>
				</div>
				<div className='hunt-stat newd__hunt__section__counter'>
					<dd
						className='counter'
						style={{ '--real-num': huntCount[0].allTimeHunts }}
					></dd>
					<dt>Total number of Hunts</dt>
				</div>
			</div>
			<div className='hunt-button-wrap'>
				{huntButtonsData.map((data) => (
					<CommonButton
						key={data.price}
						onClick={() => handleHuntButton(data.value)}
						className='hunt-button newd__btn'
					>
						{data.label}
						<span>{data.price}</span>
					</CommonButton>
				))}
			</div>
		</>
	);
};
