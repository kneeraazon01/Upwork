import React from 'react';
import LoadingCards from '../../common/LoadingCards';
import CommonButton from '../../common/CommonButton';
import TokenCard from '../../components/TokenCard';

export default ({ selected, loading, items, onHandleClaim }) => {
	let allSelected = false;
	if (Object.keys(selected).length === items.length) {
		allSelected = true;
		for (const key in selected) {
			if (!selected[key]) {
				allSelected = false;
			}
		}
	}
	return (
		<>
			{loading ? (
				<div className='card-list-flex treasure-box-list my-3'>
					<LoadingCards length={6} />
				</div>
			) : (
				<>
					<div className='card-list-flex treasure-box-list my-3'>
						{items.map((data, key) => (
							<TokenCard
								key={key}
								data={data}
								isBigClass={true}
								selected={selected[data.tokenData.class]}
							/>
						))}
					</div>
					<div className='card-list-flex treasure-box-list my-3'>
						<div className='card-list-flex-item card-button-item newd__trove__claim__btn'>
							<CommonButton onClick={onHandleClaim} disabled={!allSelected}>
								Claim The Trove
							</CommonButton>
						</div>
					</div>
				</>
			)}
		</>
	);
};
