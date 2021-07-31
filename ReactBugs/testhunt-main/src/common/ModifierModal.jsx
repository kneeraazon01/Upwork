import React, { Fragment } from 'react';

function ModifierModal(props) {
	const activeClass = props.isActive ? ' active' : '';
	const modalContainerClass = `modal-container small${activeClass}`;
	return (
		props.data && (
			<div className={modalContainerClass}>
				<div className='modal-backdrop' onClick={props.onClose}></div>
				<div className='modal newd__modal'>
					<button
						className='button button-modal-close newd__button-modal-close'
						onClick={props.onClose}
					>
						<i className='fas fa-times'></i>
					</button>
					<div className='modal-inner'>
						<div className='modal-body p-0'>
							<div className='modal-body-group vertical'>
								<div className='newd__modal__media'>
									<img src={props.data.image} width='250' />
								</div>
								<div className='newd__modal__item__description'>
									<h4 className='newd__modal__title'>{props.data.category}</h4>
									<div className='newd__modal__description newd__modal__description__small'>
										<p>{props.data.description}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default ModifierModal;
