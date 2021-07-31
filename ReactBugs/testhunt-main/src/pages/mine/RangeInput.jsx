import React, { useRef, useEffect, useState } from 'react';

const RangeInput = ({ min = '0', max = '100', value = '', onChange = () => {} }) => {
	const rangeInput = useRef(null);
	const [slider, setSlider] = useState(value);
	const offsetWidth = rangeInput.current ? rangeInput.current.offsetWidth : 0;

	useEffect(() => {
		setSlider((offsetWidth / 100) * value - 19);
	}, [offsetWidth, setSlider, value]);

	return (
		<div className='form-inner-vertical newd__form__mine__range'>
			<div
				className='newd__form__mine__range__slider'
				style={{ width: `${slider}px` }}
			></div>
			<input
				ref={rangeInput}
				type='range'
				min={min}
				max={max}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
};

export default RangeInput;
