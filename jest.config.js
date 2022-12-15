module.exports = {

    rootDir: "tests",
    testEnvironment: "jsdom",

    testPathIgnorePatterns: [
        "/node_modules/"
    ],

    "transform": {
        "^.+\\.js$": "babel-jest",
    },

};