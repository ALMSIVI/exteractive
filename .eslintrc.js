module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript/eslint'],
    root: true,
    parserOptions: {
        project: './packages/*/tsconfig.json',
        tsconfigRootDir: __dirname,
    },
}
