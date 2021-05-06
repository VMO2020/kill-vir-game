import { useThree } from 'react-three-fiber';
import { CubeTextureLoader } from 'three';

// Loads the skybox texture to be applied to the scene.
export function SkyBox() {
	const { scene } = useThree();
	const loader = new CubeTextureLoader();
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
		'/images/1.jpg',
		'/images/2.jpg',
		'/images/3.jpg',
		'/images/4.jpg',
		'/images/5.jpg',
		'/images/6.jpg',
	]);

	// Set the scene background property to the resulting texture.
	scene.background = texture;
	return null;
}
