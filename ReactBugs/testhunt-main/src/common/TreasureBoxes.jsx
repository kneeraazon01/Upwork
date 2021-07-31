import React, { useContext, useState, useEffect, Fragment } from 'react';
import { MoralisContext } from '../context/MoralisContext';
import LoadingCards from './LoadingCards';
import Select from '../components/Select';
import { options } from '../constant/treasureFilter';
import TokenCard from '../components/TokenCard';

const mockItems = [
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
	{
		category: 'CSADSA',
		image: 'Community/BTDPRO_0',
		tokenObjectId: 'Wor3FlkZ1gRC62Ay8OZeTUHs',
		tokenId: '6',
		tokenAddress: '0xaf2ed5a97c7226f6b264654d4ffd998f10cb200b',
		symbol: 'BTDBNT',
		tokenData: {
			name: 'BitDiamond Treasure',
			description: 'Magical, Crown, Red, Round, 1, A',
			image: 'https://treasure.btdmd.com/MCRR1A.png',
			class: 'MCRR1A',
			Power: 'Magical',
			Setting: 'Crown',
			Color: 'Red',
			Cut: 'Round',
			Carat: '1',
			Clarity: 'A',
			Prize: '2BNB',
			Label: 'MCRR1A - 2BNB',
		},
	},
];

function TreasureFilter({ onFilterChange, clearAllHandle }) {
	const selects = ['Rarity', 'Power', 'Setting', 'Color', 'Cut', 'Carat', 'Clarity'];

	const [deleteToggle, setDeleteToggle] = useState(selects.length);

	const clearAllSelects = (e) => {
		clearAllHandle(e);
		setDeleteToggle(deleteToggle + selects.length);
	};

	return (
		<div className='select-group mt-2'>
			{selects.map((label, i) => (
				<div className='select-container' key={selects.length + i + deleteToggle}>
					<label className='newd__select__label'>{label}</label>
					<Select
						onChange={(e) => onFilterChange(e, label)}
						allOption={true}
						options={options[label]}
					/>
				</div>
			))}
			<div className='select-container newd__tr__btn' onClick={clearAllSelects}>
				Clear options
			</div>
			<div style={{ width: '300px' }}></div>
		</div>
	);
}

export default function TreasureBoxes(props) {
	const { moralis } = useContext(MoralisContext);
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState({
		Rarity: 'all',
		Power: 'all',
		Setting: 'all',
		Color: 'all',
		Cut: 'all',
		Carat: 'all',
		Clarity: 'all',
	});

	useEffect(() => {
		async function fetchData() {
			if (!moralis) {
				return;
			}
			const responseItems = [];

			try {
				const response = await moralis.Cloud.run('getTreasureItems');
				// const responseItems = mockItems;
				for (let i = response.length - 1; i >= 0; i--) {
					const item = response[i];
					// console.log(item, item.tokenUri);
					const tokenData = JSON.parse(item);
					delete item.tokenUri;
					responseItems[i] = { ...item, tokenData };
				}
			} catch (error) {
				console.error(error);
			} finally {
				setItems(responseItems);
				setFilteredItems(responseItems);
				setLoading(false);
			}
		}

		fetchData();

		return fetchData;
	}, [moralis]);

	useEffect(() => {
		const _items = items.filter((data) => {
			const tokenData = data.tokenData;

			for (const key in filter) {
				if (filter[key] === 'all') continue;

				if (filter[key] != tokenData[key]) {
					return false;
				}
			}

			return true;
		});
		setFilteredItems(_items);
	}, [filter, items]);

	const handleFilterChange = (e, optionName) => {
		setFilter({ ...filter, [optionName]: e.target.value });
	};

	const handleClearAll = (e) => {
		setFilter({
			Rarity: 'all',
			Power: 'all',
			Setting: 'all',
			Color: 'all',
			Cut: 'all',
			Carat: 'all',
			Clarity: 'all',
		});
	};

	return loading ? (
		<div className='card-list newd__treasure__box__list'>
			<LoadingCards length={6} />
		</div>
	) : (
		<div className='newd__treasure___sect'>
			<TreasureFilter clearAllHandle={handleClearAll} onFilterChange={handleFilterChange} />
			<div className='newd__treasure__filter__result'>
				With filter: {filteredItems.length}/{items.length}
			</div>
			<div className='newd__treasure__box__list'>
				{filteredItems.map((data, key) => (
					<TokenCard
						selected={props.selected ? props.selected[data.tokenData.class] : false}
						data={data}
						key={key}
						//return prev changes
						onItemClick={() => props.onItemClick(data.tokenData)}
					/>
				))}
			</div>
		</div>
	);
}
