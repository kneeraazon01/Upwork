import React, { useState, useContext, useEffect } from 'react';
import BountySection from './BountySection';
import TreasureBoxes from '../../common/TreasureBoxes';
import { MoralisContext } from '../../context/MoralisContext';

export default () => {
	const { moralis } = useContext(MoralisContext);
	const [bountyItems, setBountyItems] = useState([]);
	const [fetchingBountyItems, setFetchingBountyItems] = useState(true);
	const [selected, setSelected] = useState(null);
	const handleTreasureClick = (data) => {
		if (selected && data.class === selected.class) {
			setSelected(null);
			return;
		}
		setSelected(data);
	};

	useEffect(async () => {
		if (!moralis) {
			return;
		}
    const responseItems = [];

    try {
      const response = await moralis.Cloud.run('getBountyItems');
      for (let i = response.length - 1; i >= 0; i--) {
        const item = response[i];
        const tokenData = JSON.parse(item.tokenUri);
        delete item.tokenUri;
        responseItems[i] = { ...item, tokenData };
      }
      console.log(responseItems);

    } catch (error) {
      console.log(error);
    } finally {
      setBountyItems(responseItems);
      setFetchingBountyItems(false);  
    }
	}, [moralis]);

	return (
		<div className='newd__container'>
			<div className='newd__main-header'>Bounties</div>
			<div className='newd__use_case__title newd__violet__text'>Today’s bounties</div>
				<section className='section-bounties newd__section-bounties'>
						<BountySection
							selected={selected}
							items={bountyItems}
							loading={fetchingBountyItems}
						/>
				</section>

        <div className='newd__use_case__title newd__violet__text'>Today’s bounties</div>
				<section className='section-treasure-box-alt newd__section-treasure-box pb-5'>
						<TreasureBoxes
							onItemClick={handleTreasureClick}
							selected={selected ? { [selected.class]: true } : null}
						/>
				</section>
		</div>
	);
};
