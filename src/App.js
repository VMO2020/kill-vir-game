import React, { useEffect, useState } from 'react';
import useMousePosition from './hooks/useMousePosition';

// Components
import { Share } from './components/Share';

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

const App = () => {
	const [status, setStatus] = React.useState('Start');
	const [currentTime, setcurrentTime] = useState(60000);
	const [gameLevel, setgameLevel] = useState(1000);
	const [score, setScore] = React.useState(0);
	const [highScore, setHighScore] = useState(0);
	const [level, setLevel] = useState('NEWBIE');
	const [timerId, setTimerId] = useState('null');

	const squares = document.querySelectorAll('.square');
	const images = document.querySelectorAll('.virus-img');

	// Hook Mousemove Position
	const { clientX, clientY } = useMousePosition();

	useEffect(() => {
		const dataR = readData('killvir');
		setHighScore(dataR);
		handleLevel(dataR);
	}, []);

	const getRamdom = () => {
		return Math.floor(Math.random() * 12) + 1;
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

		images.forEach((image) => {
			image.classList.remove('strike');
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

	const handleLevel = (dataR) => {
		dataR > 50 && setLevel('AVERAGE');
		dataR > 60 && setLevel('ADVANCED');
		dataR > 72 && setLevel('EXPERT');
		dataR > 90 && setLevel('GURU');
	};

	const handleData = () => {
		const dataName = 'killvir';
		const dataR = readData('killvir');
		setHighScore(dataR);
		score > dataR && writeData({ dataName, score });
		score > dataR && setHighScore(score);
		handleLevel(score);
	};

	const stopGame = () => {
		setcurrentTime(0);
		handleData();
		clearInterval(timerId);
		playAudio('audio-end');
		setStatus('Start');
		stopAudio('audio-game');
		squares.forEach((square) => {
			square.classList.remove('virus');
		});
	};

	// Auto stop function
	useEffect(() => {
		currentTime === 0 && stopGame();
	}, [currentTime]);

	const handleStrike = () => {
		images.forEach((image) => {
			image.classList.add('strike');
		});
	};

	const handleScore = () => {
		setScore((score) => score + 1);
		playAudio('audio-fire');
		handleStrike();
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
					<label>LEVEL: </label>
					<select onChange={(e) => setgameLevel(e.target.value)}>
						<option value='1000'>NEWBIE: 1000ms</option>
						<option value='900'>AVERAGE: 900ms s51</option>
						<option value='800'>ADVANCED: 800ms s61</option>
						<option value='650'>EXPERT: 650ms s73</option>
						<option value='500'>GURU: 500ms s91</option>
					</select>
				</div>
				<h2 className='rules' onClick={playGame}>
					<span>
						Rules: <br />
						Click or Tap over the virus <br />
						to vaporize it
					</span>
				</h2>

				<h2 className='high-score' onClick={playGame}>
					<span>{`Your high score: `}</span>
					<b>{highScore}</b>
					<br />
					<span>{`Your level: `}</span>
					<b>{level}</b>
				</h2>
				<Share url={'game.vmog.net/'} />
				<a href='https://vmog.net/' target='_blank' rel='noreferrer'>
					Copyright © and game design by VMOG
				</a>
			</div>

			<div className='grid'>
				<div className='square' id='1'>
					<img
						className='virus-img'
						src={virus}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='2'>
					<img
						className='virus-img'
						src={virus4}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='3'>
					<img
						className='virus-img'
						src={virus2}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='4'>
					<img
						className='virus-img'
						src={virus}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='5'>
					<img
						className='virus-img'
						src={virus3}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='6'>
					<img
						className='virus-img'
						src={virus}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='7'>
					<img
						className='virus-img'
						src={virus2}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='8'>
					<img
						className='virus-img'
						src={virus}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='9'>
					<img
						className='virus-img'
						src={virus5}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='10'>
					<img
						className='virus-img'
						src={virus3}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='11'>
					<img
						className='virus-img'
						src={virus}
						alt=''
						onClick={handleScore}
					></img>
				</div>
				<div className='square' id='12'>
					<img
						className='virus-img'
						src={virus4}
						alt=''
						onClick={handleScore}
					></img>
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
