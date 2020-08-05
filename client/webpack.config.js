const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devServer: {
        compress: true,
        clientLogLevel: 'silent',
        port: 3000,
        proxy: {
            '/api': 'http://localhost:3001'
        }
    },
    output: {
        path: path.resolve(__dirname, '../server/dist/client')
    }
}
