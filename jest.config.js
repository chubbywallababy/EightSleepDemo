module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverageFrom: [
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*.types.{ts,tsx}',
    '!**/src/types/*',
    '!**/src/styles/*',
    '!**/src/i18n/*',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mocks__/', // Replace with your actual path
  ],
};
