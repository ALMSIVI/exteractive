module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/core',
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'core',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/icons',
                // Use "'libraryDirectory': ''," if your bundler does not support ES modules
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'icons',
        ],
    ],
}
