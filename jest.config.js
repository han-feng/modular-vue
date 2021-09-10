module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2307, 2345],
      },
    },
  },
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/test/unit/**/*.(test|spec).(js|ts)"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,js,json}"],
  testEnvironment: "jsdom",
  resolver: "<rootDir>/test/resolver.js",
  testURL: "http://localhost/",
  collectCoverage: true,
};
