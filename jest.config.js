export default {
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	testEnvironment: 'node',
	testMatch: [
		"**/__tests__/**/*.test.js"
	],
	collectCoverageFrom: [
		"src/**/*.js",
		"!src/**/__tests__/**"
	],
	moduleFileExtensions: ['js'],
	verbose: true
};
