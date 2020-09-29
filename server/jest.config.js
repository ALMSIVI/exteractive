module.exports = {
    preset: 'ts-jest',
    globalSetup: '<rootDir>/test/config/setup.ts',
    globalTeardown: '<rootDir>/test/config/teardown.ts',
    testEnvironment: '<rootDir>/test/config/mongoEnv.js',
    setupFilesAfterEnv: ['<rootDir>/test/config/setupData.ts'],
}
