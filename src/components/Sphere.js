import React from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import {
	CubeCamera,
	WebGLCubeRenderTarget,
	RGBFormat,
	LinearMipmapLinearFilter,
} from 'three';

export function Sphere() {
	const { scene, gl } = useThree();
	// The cubeRenderTarget is used to generate a texture for the reflective sphere.
	// It must be updated on each frame in order to track camera movement and other changes.
	const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
		format: RGBFormat,
		generateMipmaps: true,
		minFilter: LinearMipmapLinearFilter,
	});
	const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
	cubeCamera.position.set(0, 0, 0);
	scene.add(cubeCamera);

	// Update the cubeCamera with current renderer and scene.
	useFrame(() => cubeCamera.update(gl, scene));

	return (
		<mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
			<directionalLight intensity={0.5} />
			<sphereGeometry attach='geometry' args={[2, 32, 32]} />
			<meshBasicMaterial
				attach='material'
				envMap={cubeCamera.renderTarget.texture}
				color='white'
				roughness={0.1}
				metalness={1}
			/>
		</mesh>
	);
}
