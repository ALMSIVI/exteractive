module.exports = {
    setupFilesAfterEnv: [
        './test/config/setup.js',
        '@testing-library/jest-dom/extend-expect',
    ],
}
