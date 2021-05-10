import { useThree } from 'react-three-fiber';
import { CubeTextureLoader } from 'three';

// Loads the skybox texture to be applied to the scene.
export function SkyBox() {
	const { scene } = useThree();
	const loader = new CubeTextureLoader();
	// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
	const texture = loader.load([
		'/images1/Front.jpg',
		'/images1/Back.jpg',
		'/images1/Up.jpg',
		'/images1/Down.jpg',
		'/images1/Right.jpg',
		'/images1/Left.jpg',
	]);

	// Set the scene background property to the resulting texture.
	scene.background = texture;
	return null;
}
