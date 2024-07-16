// jest.config.ts
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  restoreMocks: true,
  testEnvironment: 'node',

  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'ts-jest'
}

export default jestConfig
