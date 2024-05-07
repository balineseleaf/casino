import React from 'react';
import { useSpring, animated } from 'react-spring';
import moneybag from '../assets/meshok.png';

const MoneyBag = ({ show }) => {
	const animationProps = useSpring({
		opacity: show ? 1 : 0, // Показать или скрыть мешок с деньгами
		transform: show ? 'translateY(0)' : 'translateY(-100%)', // Анимация появления сверху
	});

	return (
		<animated.div style={animationProps}>
			<img
				src={moneybag}
				alt='Money Bag'
			/>
		</animated.div>
	);
};

export default MoneyBag;
