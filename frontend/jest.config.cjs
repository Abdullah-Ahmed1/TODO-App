module.exports = {
  roots: ['<rootDir>/src'],
  "setupFilesAfterEnv": [
    "./src/components/setupTests.js"
  ],
  testMatch: ['**/__tests__/**/*.(js|jsx)'],  
  moduleFileExtensions: ['js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};