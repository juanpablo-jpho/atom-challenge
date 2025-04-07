export default {
    globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/../tsconfig.spec.json',
        },
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  };