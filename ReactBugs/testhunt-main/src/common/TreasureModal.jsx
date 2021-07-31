import React from 'react';
import Map from './Map';
import * as Icons from '../components/SVGCollection';
// import CardImage from '../img/image 22.png'

export default (props) => {
	const activeClass = props.isActive ? ' newd_active' : '';
	const modalContainerClass = `modal-container large${activeClass}`;

  return (
		props.data && (
			<div className={modalContainerClass}>
				<div className='modal-backdrop' onClick={props.onClose}></div>
				<div className='modal newd__modal'>
					<button
						className='button button-modal-close newd__button-modal-close'
						onClick={props.onClose}
					>
						{/* <i className="fas fa-times"></i>  */}
						<Icons.CloseIcon />
					</button>
					<div className='modal-inner'>
						<div className='modal-body p-0'>
							<div className='newd__modal__body'>
								<div className='newd__modal__body__item__info'>
									<div className='newd__modal__media'>
										{/* <img src={CardImage} width='235' alt={props.data.name} /> */}
										<img src={props.data.image} width='235' alt={props.data.name} />
									</div>
									<div className='newd__modal__item__description'>
										<h4 className='newd__modal__title'>{props.data.name}</h4>
										<div className='newd__modal__subtitle'>
											{props.data.class}
										</div>
										<span className='newd__modal__description newd__modal__description__small'>
											<div className='newd__company__card__left_container__subtitle newd__modal__description__block'>
												<div className='newd__company__card__left_container__left__text newd__modal__description__block__center'>
													<p>
														<strong> Power: </strong> {props.data.Power}
													</p>
													<p>
														<strong> Color: </strong> {props.data.Color}
													</p>
													<p>
														<strong> Cut: </strong> {props.data.Cut}
													</p>
													<p>
														<strong> Carat: </strong> {props.data.Carat}
													</p>
                          <p>
														<strong> Clarity: </strong> {props.data.Clarity}
													</p>
													<p>
														<strong> Setting: </strong> {props.data.Setting}
													</p>
													<p>
														<strong> Rarity Score : </strong> {'Unknown'}
													</p>
													<p>
														<strong> Token created: </strong> {'05.07.2021'}
													</p>
												</div>
											</div>
										</span>
                    <span className='newd__modal__description'>
											<div className='newd__company__card__left_container__subtitle newd__modal__description__block'>
												<div className='newd__company__card__left_container__left__text'>
													<p>
														<strong> Power: </strong>
													</p>
													<p>
														<strong> Color: </strong>
													</p>
													<p>
														<strong> Cut: </strong>
													</p>
													<p>
														<strong> Carat: </strong>
													</p>
												</div>
												<div className='newd__company__card__left_container__left__text'>
													<p> {props.data.Power}</p>
													<p> {props.data.Color}</p>
													<p> {props.data.Cut}</p>
													<p>{props.data.Carat}</p>
												</div>
											</div>
											<div className='newd__company__card__left_container__subtitle newd__modal__description__block'>
												<div className='newd__company__card__left_container__left__text'>
													<p>
														<strong> Clarity: </strong>
													</p>
													<p>
														<strong> Setting: </strong>
													</p>
													<p>
														<strong> Rarity Score : </strong>
													</p>
													<p>
														<strong> Token created: </strong>
													</p>
												</div>
												<div className='newd__company__card__left_container__left__text'>
													<p> {props.data.Clarity}</p>
													<p> {props.data.Setting}</p>
													<p> {'Unknown'}</p>
													<p>{'05.07.2021'}</p>
												</div>
											</div>
										</span>
									</div>
								</div>
								<div className='newd__modal__map'>
									<Map />
								</div>
							</div>
						</div>
					</div>
					<div className='modal-footer newd__mr10'>
						<button
							type='button'
							className='button newd__button-modal-footer button-modal-footer'
							onClick={props.onClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		)
	);
};
