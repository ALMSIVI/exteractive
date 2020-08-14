module.exports = {
    preset: 'ts-jest',
    globalSetup: './test/config/setup.ts',
    globalTeardown: './test/config/teardown.ts',
    testEnvironment: './test/config/mongoEnv.js',
}
