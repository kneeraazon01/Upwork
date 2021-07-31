import React from 'react';
import * as Icons from '../components/SVGCollection';

function PopupModal(props) {
	const activeClass = props.isActive ? ' newd_active' : '';
	const modalContainerClass = `modal-container small${activeClass}`;
	return (
		<div className={modalContainerClass}>
			<div className='modal-backdrop' onClick={props.onClose}></div>
			<div className='modal newd__modal'>
				{props.onClose && (
					<button
						className='button button-modal-close newd__button-modal-close'
						onClick={props.onClose}
					>
						{/* <i className="fas fa-times"></i>  */}
						<Icons.CloseIcon />
					</button>
				)}
				<div className='modal-inner newd__modal__inner'>
					<div className='modal-body text-center newd__modal__text '>
						{props.children}
					</div>

					<div className='modal-footer newd__modal__footer'>
						{props.okLabel && (
							<button
								type='button'
								className='button newd__button-modal-footer button-modal-footer'
								onClick={props.onClose}
							>
								{props.okLabel}
							</button>
						)}
						{props.footerContent && props.footerContent}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PopupModal;
