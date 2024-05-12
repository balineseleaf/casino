import './Game.css';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import SlotCounter from 'react-slot-counter';
import cherry from '../assets/symbols/Cherries.svg';
import hotPepper from '../assets/symbols/HotPepper.svg';
import money from '../assets/symbols/MoneyBag.svg';
import redSeven from '../assets/symbols/redSeven.png';
import lemon from '../assets/symbols/Lemon.svg';
import dizzy from '../assets/symbols/Dizzy.svg';
import { BalanceContext } from '../context/BalanceContext';
import { mapFromIconToNumbers } from './utils/MapFromIconsToNumbers';

const BASE_URL = 'http://localhost:5002';

const Game = () => {
	const { currentBalance, deposit } = useContext(BalanceContext);
	const [numbers, setNumbers] = useState([]);
	const [bonus, setBonus] = useState(0);
	const [userBalance, setUserBalance] = useState(0);
	const [winAmount, setWinAmount] = useState(0);
	const [iconsByNumbersObj, setIconsByNumbersObj] = useState({});
	const [count, setCount] = useState(1);
	const slot5Ref = React.useRef(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const [disableCountButton, setDisableCountButton] = useState(true);
	const userId = 509294090;
	const betValue = count;

	const getNumbers = async (userId, betValue) => {
		try {
			const response = await fetch(`${BASE_URL}/betdone`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: userId,
					betValue: betValue,
				}),
			});

			const responseJSON = await response.json();
			console.log(responseJSON);
			return responseJSON;
		} catch (error) {
			console.log('Error getting numbers:', error);
			throw error;
		}
	};

	useEffect(() => {
		const orderedObjectWithIconForReels = {};
		numbers?.forEach((number, index) => {
			const iconsFromServerByNumber = mapFromIconToNumbers.get(+number);
			if (iconsFromServerByNumber) {
				orderedObjectWithIconForReels[index] = iconsFromServerByNumber;
			}
		});
		setIconsByNumbersObj(orderedObjectWithIconForReels);
	}, [numbers]);

	useEffect(() => {
		if (!isSpinning && winAmount > 0) {
			deposit(winAmount);
			setWinAmount(0);
		}
	}, [isSpinning, winAmount, deposit]);

	const handleSpinClick = async () => {
		setIsSpinning(true);
		try {
			const answerFromServer = await getNumbers(userId, betValue);
			setNumbers(answerFromServer?.combination);
			setBonus(answerFromServer?.bonusAmount);
			setWinAmount(answerFromServer?.winAmount);
			setUserBalance(answerFromServer?.userBalance);
		} catch (error) {
			console.log(error);
		} finally {
			slot5Ref.current?.startAnimation();
			setTimeout(() => {
				setIsSpinning(false);
				deposit(-count);
			}, 1050);
		}
	};

	const increaseCount = () => {
		setCount((prevState) => prevState + 1);
		if (disableCountButton && count + 1 > 0) {
			setDisableCountButton(false);
		}
	};

	const decreaseCount = () => {
		setCount((prevState) => prevState - 1);
		if (count - 1 <= 1) {
			setDisableCountButton(!disableCountButton);
		}
	};

	return (
		<div className='game-container'>
			<div className='desk'></div>
			<div className='game-info'>
				<h2 className='game-header'>Ваш баланс: {Math.floor(userBalance)} usdt</h2>
			</div>

			<div className='playground'>
				<div className='slot-container'>
					<SlotCounter
						ref={slot5Ref}
						startValueOnce={true}
						autoAnimationStart={false}
						startValue={[
							<img
								className='item'
								src={redSeven}
								alt='image'
							/>,
							<img
								className='item'
								src={redSeven}
								alt='image'
							/>,
							<img
								className='item'
								src={redSeven}
								alt='image'
							/>,
						]}
						value={[
							<img
								className='item'
								src={iconsByNumbersObj[0]}
								alt='image'
							/>,
							<img
								className='item'
								src={iconsByNumbersObj['1']}
								alt='image'
							/>,
							<img
								className='item'
								src={iconsByNumbersObj['2']}
								alt='image'
							/>,
						]}
						dummyCharacters={[
							<img
								className='item'
								src={lemon}
								alt='image'
							/>,
							<img
								className='item'
								src={hotPepper}
								alt='image'
							/>,
							<img
								className='item'
								src={redSeven}
								alt='image'
							/>,
							<img
								className='item'
								src={dizzy}
								alt='image'
							/>,
							<img
								className='item'
								src={cherry}
								alt='image'
							/>,
							<img
								className='item'
								src={money}
								alt='image'
							/>,
						]}
					/>
					<p className='bonus-amount'>{bonus !== null ? `Your Bonus: ${bonus} usdt ! Hooray` : `No bonus :(`}</p>
				</div>
			</div>
			<div className='connector'></div>
			<div className='roof'></div>
			<div className='game-buttons'>
				<div className='bid-buttons'>
					<div className='bid-block'>
						<p className='bid-text'>Ставка: {count} usdt</p>
					</div>
					<div className='count-buttons-block'>
						<button
							type='button'
							onClick={increaseCount}
							className='count-button increase'>
							+
						</button>
						<button
							type='button'
							onClick={decreaseCount}
							className={`count-button decrease ${disableCountButton ? 'disabled' : ''}`}
							disabled={disableCountButton}>
							-
						</button>
					</div>
				</div>

				<div id='controls'>
					<button
						type='button'
						className='game-button '
						onClick={handleSpinClick}
						disabled={isSpinning || count > currentBalance}>
						{isSpinning ? 'Вращается...' : 'Вращать'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Game;
