// this function will generate the reg number of 8 digit;
const generateRegNumber = () => {
	const timestamp = Date.now().toString(36);
	const random = Math.random().toString(36).slice(2, 8);
	const regNumber = timestamp + random;
	const paddedRegNumber = regNumber.padEnd(8, "0");
	return paddedRegNumber.toUpperCase();
};
module.exports = generateRegNumber;
