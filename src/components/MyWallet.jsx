import { Link } from 'react-router-dom';
import './MyWallet.css';
import React, { useContext } from 'react';
import { BalanceContext } from '../context/BalanceContext';

const MyWallet = () => {
	const { currentBalance, deposit } = useContext(BalanceContext);

	const handleDeposit = () => {
		deposit(100);
	};

	const getBalance = async (userId, betValue) => {
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

	console.log('mywallet', currentBalance);
	return (
		<div className='wallet-container'>
			<div className='wallet-info'>
				<h2 className='wallet-header'>Мой Кошелек</h2>
				<p className='wallet-balance'>Мой баланс: {currentBalance} USDT</p>
			</div>
			<div className='buttons-wallet'>
				<button
					type='button'
					className='button-wallet'
					onClick={handleDeposit}>
					ПОПОЛНИТЬ
				</button>
				<button
					type='button'
					className='button-wallet'>
					ВЫВЕСТИ
				</button>
			</div>
		</div>
	);
};

export default MyWallet;
