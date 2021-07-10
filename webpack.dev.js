const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/client/index.js'),
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(svg|gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/client/views/index.html'),
            filename: './index.html'
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};
