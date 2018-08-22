const mergeWebpack = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const helpers = require('./helpers');
const env = require('../environment');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


const config = {};


config.target = 'node';
config.externals = [nodeExternals()];
config.node = {
    __dirname: false,
    __filename: false
};


if (!env.isTest) {
    config.entry = helpers.root('src', 'server.ts');
}


config.output = env.isTest ? {} : {
    filename: 'server.js',
    path: helpers.root('dist')
}


config.plugins = [
    new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();', raw: true, entryOnly: false
    })
];
config.optimization = {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false
                },
                mangle: false
            }
        })
    ]
};
config.devtool = "eval-source-map";
module.exports = mergeWebpack(commonConfig, config);
