/**
 * Created by thomasrieder on 11.02.16.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './index.js',
    devtool: "source-map",

    output: {
        path: "./dist",
        filename: "bundle.min.js"
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
        ]
    },

    resolve: {
        alias: {
            clipboard: path.resolve(__dirname, 'lib', 'clipboard.min.js'),
            jquery: path.resolve(__dirname, 'lib', 'jquery.min.js')
        }
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new ExtractTextPlugin("styles.css")
    ]
};