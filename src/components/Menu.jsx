import { Link } from 'react-router-dom';
import './Menu.css';
import casino from './../assets/casino.jpg';
import game from './../assets/game.png';
import wallet from './../assets/wallet.png';
import rules from './../assets/rules.png';

const Menu = () => {
	return (
		<div className='menu'>
			<Link
				type='button'
				className='button'
				to='/'>
				<img
					className='menu-image'
					src={game}
					alt='game'
				/>
			</Link>
			<Link
				type='button'
				className='button'
				to='/wallet'>
				<img
					className='menu-image'
					src={wallet}
					alt='wallet'
				/>
			</Link>
			<Link
				type='button'
				className='button'
				to='/rules'>
				<img
					className='menu-image'
					src={rules}
					alt='rules'
				/>
			</Link>
		</div>
	);
};

export default Menu;
