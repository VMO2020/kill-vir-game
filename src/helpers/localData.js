// const dataName = 'killvir';

const readData = ({ dataName = 'killvir' }) => {
	const dataRead = localStorage.getItem(dataName) || '0';
	console.log(dataRead);
	return dataRead;
};

const writeData = ({ dataName = 'killvir', score = 0 }) => {
	localStorage.setItem(dataName, score);
	return {};
};

export { readData, writeData };
