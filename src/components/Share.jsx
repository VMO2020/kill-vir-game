import React from 'react';

// Icons
import { ReactComponent as Icon1 } from '../icons/share/whatsapp.svg';
import { ReactComponent as Icon2 } from '../icons/share/facebook.svg';
import { ReactComponent as Icon3 } from '../icons/share/twitter.svg';

// Styles
import './share.scss';

export const Share = ({ url }) => {
	return (
		<section className='social-share'>
			<div
				className='fb-share-button'
				data-href={`https://${url}`}
				data-layout='button'
				data-size='large'
			>
				<a
					target='_blank'
					rel='noreferrer'
					href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F.${url}%2F&amp;src=sdkpreparse`}
					className='btn btn-social btn-facebook'
				>
					<Icon2 /> Share
				</a>
			</div>

			<a
				className='btn btn-social btn-whatsapp'
				rel='noreferrer'
				data-action='share/whatsapp/share'
				href={`whatsapp://send?text=https%3A%2F%2F${url}/`}
			>
				<Icon1 /> Share
			</a>

			<a
				className='btn btn-social btn-twitter'
				target='_blank'
				rel='noreferrer'
				href={`https://twitter.com/intent/tweet?text=https://${url}/`}
			>
				<Icon3 /> Tweet
			</a>
		</section>
	);
};
