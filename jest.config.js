module.exports = {
    preset: 'ts-jest',  // If you're using TypeScript
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
      // Mock for text files
     '\\.(txt)$': 'identity-obj-proxy',
      // Mock for image files
     '\\.(png|jpg|jpeg|gif)$': '<rootDir>/__mocks__/fileMock.js',
    },
};
  