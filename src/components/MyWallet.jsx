import { Link } from 'react-router-dom';
import './MyWallet.css';

const MyWallet = () => {
	return (
		<div className='wallet-container'>
			<div className='wallet-info'>
				<h2 className='wallet-header'>Мой Кошелек</h2>
				<p className='wallet-balance'>Мой баланс: 99 USDT</p>
			</div>
			<div className='buttons'>
				<Link
					type='button'
					to='#'
					className='button'>
					ПОПОЛНИТЬ
				</Link>
				<Link
					type='button'
					className='button'
					to='#'>
					ВЫВЕСТИ
				</Link>
			</div>
		</div>
	);
};

export default MyWallet;
