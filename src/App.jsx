import { useState } from 'react';
import './App.css';
import Game from './components/Game';
import MainPage from './components/MainPage';
import MyWallet from './components/MyWallet';
import { Routes, Route } from 'react-router-dom';

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
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
		</>
	);
}

export default App;
