module.exports = async () => {
  return {
    rootDir: process.cwd(),
    testTimeout: 30000,
    testEnvironment: 'jsdom',
    verbose: true,
    testPathIgnorePatterns: [
      '<rootDir>/node_modules',
      '<rootDir>/dist',
      '<rootDir>/src/utils/generateTheme.ts',
      '<rootDir>/src/utils/arrayShuffler.ts'
    ],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    roots: ['<rootDir>/tests'],
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
      '^.+\\.(ts)$': 'ts-jest'
    },
    collectCoverage: true,
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/{!(generateTheme|arrayShuffler),}.ts'],
    coverageThreshold: {
      global: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: -10
      }
    }
  };
};
