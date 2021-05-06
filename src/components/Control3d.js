import React from 'react';
import { Canvas } from 'react-three-fiber';
import './control3d.scss';

// Components
import { SkyBox } from './SkyBox';
import { CameraControls } from './CameraControls';

function Control3d() {
	return (
		<Canvas className='canvas'>
			<CameraControls />
			<SkyBox />
		</Canvas>
	);
}

export default Control3d;
