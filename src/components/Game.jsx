import './Game.css';
import './SlotMachine.css';
import React, { useEffect, useState } from 'react';
import SlotMachine from './SlotMachine';
import dollarIcon from '../assets/symbols/dollar-icon.svg';
import orangeIcon from '../assets/symbols/orange-icon.svg';
import cloverIcon from '../assets/symbols/clover-icon.svg';
import starIcon from '../assets/symbols/star-icon.svg';
import bananaIcon from '../assets/symbols/banana-icon.svg';
import strawberryFruitIcon from '../assets/symbols/strawberry-fruit-icon.svg';

const Game = () => {
	const [symbols, setSymbols] = useState([
		dollarIcon,
		strawberryFruitIcon,
		orangeIcon,
		cloverIcon,
		starIcon,
		bananaIcon,
	]);
	const [spinning, setSpinning] = useState(false);
	const [result, setResult] = useState(['', '', '']);
	const [animationDuration, setAnimationDuration] = useState(1000);

	const spin = () => {
		setSpinning(true);
		const newResult = [
			symbols[Math.floor(Math.random() * symbols.length)],
			symbols[Math.floor(Math.random() * symbols.length)],
			symbols[Math.floor(Math.random() * symbols.length)],
		];
		setResult(newResult);
	};

	useEffect(() => {
		if (spinning) {
			const timer = setTimeout(() => {
				setSpinning(false);
			}, animationDuration);
			return () => clearTimeout(timer);
		}
	}, [spinning, animationDuration]);

	return (
		<div className='game-container'>
			<div
				id='test'
				className='game-info'>
				<h2 className='game-header'>Ваш баланс: 99 usdt</h2>
			</div>
			{/* <div id='slot'>
				<div id='reels'>
					<div className='reel'></div>
					<div className='reel'></div>
					<div className='reel'></div>
					<div className='reel'></div>
					<div className='reel'></div>
				</div>
			</div> */}
			<SlotMachine
				result={result}
				spinning={spinning}
				spin={spin}
				animationDuration={animationDuration}
			/>
			<div className='game-buttons'>
				<div className='bid-buttons'>
					<div className='bid-block'>
						<p className='bid-text'>Ставка: 1 usdt</p>
					</div>
					<div className='buttons-block'>
						<button
							type='button'
							className='increase-button'>
							+
						</button>
						<button
							type='button'
							className='decrease-button'>
							-
						</button>
					</div>
				</div>
				<div id='controls'>
					<button
						className='game-button'
						onClick={spin}
						disabled={spinning}>
						{spinning ? 'Крутится...' : 'Крутить'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Game;
