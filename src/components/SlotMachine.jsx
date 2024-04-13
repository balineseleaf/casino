import React from 'react';
import './SlotMachine.css';

const SlotMachine = ({ spinning, result, animationDuration }) => {
	return (
		<div className='slot-machine'>
			<div className='reels'>
				{result.map((symbol, index) => (
					<div
						key={index}
						className={`reel ${spinning ? 'spin' : ''}`}
						style={{
							animationDuration: `${animationDuration / 1000}s`,
						}}>
						<div className='inner-reel'>
							<div className='symbol'>{symbol}</div>
							<div className='symbol'>{symbol}</div>
							<div className='symbol'>{symbol}</div>
							<div className='symbol'>{symbol}</div>
							<div className='symbol'>{symbol}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SlotMachine;
