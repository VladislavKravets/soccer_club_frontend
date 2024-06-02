// jest.config.js
module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testURL: 'http://localhost',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/tests/styleMock.js',
        axios: 'axios/dist/node/axios.cjs',
    },
};
