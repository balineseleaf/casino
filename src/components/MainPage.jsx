import { Link } from 'react-router-dom';
import './MainPage.css';
import casino from './../assets/casino.jpg';

const MainPage = () => {
	return (
		<div className='container'>
			<img
				src={casino}
				alt='casino'
				className='image'
			/>
			<div className='buttons'>
				<Link
					type='button'
					className='button'
					to='/game'>
					ИГРАТЬ
				</Link>
				<Link
					type='button'
					className='button'
					to='/wallet'>
					МОЙ КОШЕЛЕК
				</Link>
				<Link
					type='button'
					className='button'
					to='/rules'>
					ПРАВИЛА
				</Link>
			</div>
		</div>
	);
};

export default MainPage;
