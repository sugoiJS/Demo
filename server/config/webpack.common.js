const webpack = require('webpack');
const helpers = require('./helpers');
const env = require('../environment');


const config = {};


if (env.isProd) {
	config.devtool = 'source-map';
}
else if (env.isTest) {
	config.devtool = 'inline-source-map';
}
else {
	config.devtool = 'eval-source-map';
}


config.resolve = {
	extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
	modules: [
		helpers.root('../'),
		helpers.root('node_modules')
	]
};


config.module = {
	rules: [
		{
			test: /\.ts$/,
			exclude: [/node_modules/],
			loader: 'awesome-typescript-loader'
		}
	]
};


config.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			ENV: JSON.stringify(env.ENV)
		}
	})
];


module.exports = config;
