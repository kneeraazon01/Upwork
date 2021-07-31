import React, { Fragment, useState, useContext, useEffect } from 'react';
import TreasureBoxes from '../../common/TreasureBoxes';
import TroveSection from './TroveSection';
import { MoralisContext } from '../../context/MoralisContext';
import { claimTrove } from '../../utils/stakingintegration';

export default () => {
	const { moralis } = useContext(MoralisContext);
	const [selected, setSelected] = useState({});
	const [currentValue, setCurrentValue] = useState(0);
	const [troveItems, setTroveItems] = useState([]);
	const [fetchingTroveItems, setFetchingTroveItems] = useState(true);

	const handleTreasureClick = (data) => {
		const found = troveItems.find((value) => value.tokenData.class == data.class);
		if (!found) {
			return;
		}
		if (selected[data.class]) {
			setSelected({ ...selected, [data.class]: false });
			return;
		}
		setSelected({ ...selected, [data.class]: true });
	};

	const fetchTroveItems = async () => {
    const responseItems = [];

    try {
      const response = await moralis.Cloud.run('getTroveItems');
      for (let i = response.length - 1; i >= 0; i--) {
        const item = response[i];
        const tokenData = JSON.parse(item.tokenUri);
        delete item.tokenUri;
        responseItems[i] = { ...item, tokenData };
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTroveItems(responseItems);
      setFetchingTroveItems(false);  
    }
	};

	const handleClaim = async () => {
		const ids = troveItems.map((data) => data.tokenId);
		await claimTrove(moralis, ids);
	};

	useEffect(async () => {
		if (!moralis) {
			return;
		}
    try {
      const response = await moralis.Cloud.run('getTroveValue');
      const _value = response.split(' ');
      if (_value && _value.length > 0) {
        const price = Number(_value[0])
          .toFixed(5)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        _value.shift();
        setCurrentValue(price + ' ' + _value.join(' '));
      }
  
      fetchTroveItems();
    } catch (error) {
      console.log(error);
    }
	}, [moralis]);

	return (
		<div className='newd__container'>
			<div className='newd__main-header'>The Trove</div>
			<div className='newd__current__value__container trove-value-title text-center'>
				<div className='newd__current__value__title'>Current Value:</div>
				<div className='newd__current__value__value'>{currentValue}</div>
			</div>
			<section className='section-trove pb-4 pt-0'>
				<TroveSection
					items={troveItems}
					loading={fetchingTroveItems}
					selected={selected}
					onHandleClaim={handleClaim}
					selected={selected}
				/>
			</section>
			<div className='newd__use_case__title newd__violet__text'>Your treasure box</div>
			<section className='section-treasure-box-alt newd__section-treasure-box pb-5'>
				<TreasureBoxes selected={selected} onItemClick={handleTreasureClick} />
			</section>
		</div>
	);
};
