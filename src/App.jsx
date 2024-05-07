import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import MainPage from './components/MainPage';
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
			<Routes>
				<Route
					path='/'
					element={<MainPage />}
				/>
				<Route
					path='/wallet'
					element={<MyWallet />}
				/>
				<Route
					path='/game'
					element={<Game />}
				/>
			</Routes>
		</BalanceContext.Provider>
	);
}

export default App;
