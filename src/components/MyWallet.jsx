import { Link } from 'react-router-dom';
import './MyWallet.css';
import React, { useContext } from 'react';
import { BalanceContext } from '../context/BalanceContext';

const MyWallet = () => {
	const { currentBalance, deposit } = useContext(BalanceContext);

	const handleDeposit = () => {
		deposit(100);
	};

	console.log('mywallet', currentBalance);
	return (
		<div className='wallet-container'>
			<div className='wallet-info'>
				<h2 className='wallet-header'>Мой Кошелек</h2>
				<p className='wallet-balance'>Мой баланс: {currentBalance} USDT</p>
			</div>
			<div className='buttons'>
				<button
					type='button'
					className='button'
					onClick={handleDeposit}>
					ПОПОЛНИТЬ
				</button>
				<button
					type='button'
					className='button'>
					ВЫВЕСТИ
				</button>
				<Link
					to='/game'
					className='button'>
					ИГРАТЬ
				</Link>
			</div>
		</div>
	);
};

export default MyWallet;
