import React, { useRef } from 'react';
import * as Icons from '../../components/SVGCollection';

const NumberInput = ({ min = '0', max = '100', value = '', onChange = () => {}, step = 1 }) => {
	const numberInput = useRef(null);

	return (
		<div>
			<input
				type='number'
				min={min}
				max={max}
				value={value}
				onChange={onChange}
				ref={numberInput}
			/>
			<span
				className='newd__form__mine__input__btn__up'
				onClick={(e) => {
					e.preventDefault();
					numberInput.current.stepUp(step);
				}}
			>
				<Icons.ArrowUpIcon className='newd__stake__arrow'/>
				<Icons.ArrowUpBlackIcon className='newd__stake__arrow_b'/>
			</span>
			<span
				className='newd__form__mine__input__btn__down'
				onClick={(e) => {
					e.preventDefault();
					numberInput.current.stepDown(step);
				}}
			>
				<Icons.ArrowDownIcon className='newd__stake__arrow'/>
				<Icons.ArrowDownBlackIcon className='newd__stake__arrow_b' />
			</span>
		</div>
	);
};

export default NumberInput;
