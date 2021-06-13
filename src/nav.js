import React, { useEffect } from 'react';
import './nav.css';
import { useState } from 'react';

function Nav() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});
		return () => {
			window.removeEventListener('scroll');
		};
	}, []);

	return (
		<div className={`nav ${show && 'nav__black'}`}>
			<img
				className='nav__logo'
				src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
				alt='Netflix Logo'
			/>

			<img
				className='nav__avatar'
				src='https://media-exp1.licdn.com/dms/image/C5103AQGyUGRw7iEr-A/profile-displayphoto-shrink_200_200/0?e=1602720000&v=beta&t=_l8BEqIvR-ZFRxuknD9DsVUFb5nXxCs13M5SxEKedKA'
				alt='Netflix Logo'
			/>
		</div>
	);
}

export default Nav;
