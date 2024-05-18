import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import Menu from './components/Menu';
import Rules from './components/Rules';
import MyWallet from './components/MyWallet';
import { Routes, Route } from 'react-router-dom';
import { BalanceContext } from './context/BalanceContext';

function App() {
	const [currentBalance, setCurrentBalance] = useState(100);

	const deposit = (amount) => {
		setCurrentBalance((prevBalance) => prevBalance + amount);
	};

	return (
		<BalanceContext.Provider value={{ currentBalance, deposit }}>
			<div className='app'>
				<Menu />
				<Routes>
					<Route
						path='/'
						element={<Game />}
					/>
					<Route
						path='/wallet'
						element={<MyWallet />}
					/>
					<Route
						path='/rules'
						element={<Rules />}
					/>
				</Routes>
			</div>
		</BalanceContext.Provider>
	);
}

export default App;
