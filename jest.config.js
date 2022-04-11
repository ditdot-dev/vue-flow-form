module.exports = async () => {
  return {
    verbose: true,
    rootDir: "./",
    moduleFileExtensions: ["js", "json", "vue"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|sass|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
    },
    transform: {
      ".*\\.(vue)$": "@vue/vue3-jest",
      "^.+\\.js$": "babel-jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!vue-the-mask|vue-textarea-autosize)",
    ],
    testEnvironment: "jest-environment-jsdom",
  };
};
