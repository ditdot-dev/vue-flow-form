module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ['/node_modules/(?!(vue-the-mask|vue-textarea-autosize)/)'],
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue"
  ],
  transform: {
    // process `*.vue` files with `vue-jest`
      "^.+\\.js$": "babel-jest",
      "^.+\\.vue$": "vue-jest"
  },
  moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1"
    }
}
