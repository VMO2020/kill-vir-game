import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from './Box.js';

const BoxFrame = () => {
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Box position={[-2, 0, 0]} />
			<Box position={[0, 0, 0]} />
			<Box position={[2, 0, 0]} />
		</Canvas>
	);
};

export default BoxFrame;
