const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                type: "javascript/auto",
                use: {
                    loader: "ts-loader",
                },
                exclude: '/node_modules',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'static'),
                    to: path.join(__dirname, 'dist')
                },
            ],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    // },
    target: 'node'
};