module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2307, 2345]
      }
    }
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(modular-core|vuex-along))'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/test/unit/**/*.(test|spec).(js|ts)'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,js,json}'
  ],
  browser: true,
  testURL: 'http://localhost/',
  collectCoverage: true
}
