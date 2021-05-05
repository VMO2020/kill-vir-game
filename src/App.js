import React, { useEffect, useState } from 'react';
import useMousePosition from './hooks/useMousePosition';

// Helpers
import { readData, writeData } from './helpers/localData';

//Images
import virus from './assets/virus1.png';
import virus2 from './assets/virus2.png';
import virus3 from './assets/virus3.png';
import virus4 from './assets/virus4.png';
import virus5 from './assets/virus5.png';

// Styles
import './app.scss';

// TODO: Localstorage helper implementation

const App = () => {
	const [status, setStatus] = React.useState('Start');
	const [currentTime, setcurrentTime] = useState(60000);
	const [gameLevel, setgameLevel] = useState(1000);
	const [score, setScore] = React.useState(0);
	const [highScore, setHighScore] = useState(0);
	const [timerId, setTimerId] = useState('null');

	const squares = document.querySelectorAll('.square');

	// Hook Mousemove Position
	const { clientX, clientY } = useMousePosition();

	useEffect(() => {
		const dataR = readData();
		setHighScore(dataR);
	}, []);

	const getRamdom = () => {
		return Math.floor(Math.random() * (12 - 1) + 1);
	};

	const ramdomSquare = () => {
		const ramdomPosition = getRamdom();
		// console.log(ramdomPosition);

		squares.forEach((square) => {
			if (square.id === String(ramdomPosition)) {
				square.classList.add('virus');
			} else {
				square.classList.remove('virus');
			}
		});
	};

	const playGame = () => {
		setcurrentTime(60000);
		setScore(0);
		setStatus('Stop');
		playAudio('audio-game');
		setTimerId(
			setInterval(() => {
				ramdomSquare();
				setcurrentTime((currentTime) => currentTime - 1000);
			}, gameLevel)
		);
	};

	const handleData = () => {
		const dataR = readData();
		setHighScore(dataR);
		score > dataR && writeData({ score });
		score > dataR && setHighScore(score);
	};

	const stopGame = () => {
		setcurrentTime(0);
		clearInterval(timerId);
		playAudio('audio-end');
		setStatus('Start');
		stopAudio('audio-game');
		handleData();
		squares.forEach((square) => {
			square.classList.remove('virus');
		});
	};

	// Auto stop function
	useEffect(() => {
		currentTime === 0 && stopGame();
	}, [currentTime]);

	const handleScore = () => {
		setScore((score) => score + 1);
		playAudio('audio-fire');
	};

	const playAudio = (e) => {
		const audioEl = document.getElementsByClassName(e)[0];
		audioEl.play();
	};

	const stopAudio = (e) => {
		const audioEl = document.getElementsByClassName(e)[0];
		audioEl.pause();
	};

	return (
		<div className='container-game'>
			<audio className='audio-fire'>
				<source src='sounds/fire3.mp3'></source>
			</audio>
			<audio className='audio-game'>
				<source src='sounds/spaceship1.mp3'></source>
			</audio>
			<audio className='audio-end'>
				<source src='sounds/end1.mp3'></source>
			</audio>
			<div className='score-board'>
				<div className='box'>
					<h2>Your score:</h2>
					<h2 id='score'>{score}</h2>
				</div>
				<div className='box'>
					<h2>Time Left:</h2>
					<h2 id='time-left'>{currentTime / 1000}</h2>
				</div>
			</div>
			<div
				className='start-board'
				style={status === 'Stop' ? { display: 'none' } : { display: 'flex' }}
			>
				<div className='level'>
					<label>Game LEVEL: </label>
					<select onChange={(e) => setgameLevel(e.target.value)}>
						<option value='1000'>Easy: 1000ms</option>
						<option value='800'>Medium: 800ms</option>
						<option value='600'>High: 600ms</option>
						<option value='400'>Pro: 400ms</option>
					</select>
				</div>
				<h2 className='rules' onClick={playGame}>
					<span>
						Rules: <br />
						Click or Tap over the virus <br />
						to KILL it
					</span>
				</h2>

				<h2 className='high-score' onClick={playGame}>
					<span>{`High Score: ${highScore}`}</span>
				</h2>
			</div>

			<div className='grid'>
				<div className='square' id='1'>
					<img src={virus} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='2'>
					<img src={virus4} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='3'>
					<img src={virus2} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='4'>
					<img src={virus} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='5'>
					<img src={virus3} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='6'>
					<img src={virus} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='7'>
					<img src={virus2} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='8'>
					<img src={virus} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='9'>
					<img src={virus5} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='10'>
					<img src={virus3} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='11'>
					<img src={virus} alt='' onClick={handleScore}></img>
				</div>
				<div className='square' id='12'>
					<img src={virus4} alt='' onClick={handleScore}></img>
				</div>
			</div>

			<div className='btn-box'>
				<button
					className='btn'
					onClick={playGame}
					style={status === 'Stop' ? { display: 'none' } : { display: 'block' }}
				>
					{status}
				</button>
			</div>

			<div
				className='sight'
				style={{ left: `${clientX}px`, top: `${clientY}px` }}
			>
				<span>+</span>
			</div>
		</div>
	);
};

export default App;
