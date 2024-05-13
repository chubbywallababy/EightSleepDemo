module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/*.types.{ts,tsx}',
    '!**/types/*',
    '!**/node_modules/**',
  ],
};
