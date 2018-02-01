/**
 * Created by thomasrieder on 11.02.16.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './index.js',
    devtool: "source-map",

    output: {
        path: __dirname + "/dist",
        filename: "bundle.min.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            prefix: 'fonts'
                        }
                    }
                ]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("styles.css")
    ]
};