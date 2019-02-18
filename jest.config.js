module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: "test/.*\.spec\.ts$",
  testMatch: null,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json'
    }
  }
};