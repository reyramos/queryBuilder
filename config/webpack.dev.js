var path = require("path"),
	fs = require('fs');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

var userConfig = fs.existsSync('.user.config.js') ? require('./.user.config') : {
	devServer: {
		historyApiFallback: true,
		stats: 'minimal'
	}
};


const ENV = process.env.NODE_ENV = process.env.ENV = 'development';


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig.metadata, {
	host: HOST,
	port: PORT,
	ENV: ENV,
	HMR: HMR
});


module.exports = webpackMerge(commonConfig, {
	/**
	 * Developer tool to enhance debugging
	 *
	 * See: http://webpack.github.io/docs/configuration.html#devtool
	 * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
	 */
	devtool: 'cheap-module-source-map',
	output: {

		/**
		 * The output directory as absolute path (required).
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-path
		 */
		path: helpers.root('dist'),

		/**
		 * Specifies the name of each output file on disk.
		 * IMPORTANT: You must not specify an absolute path here!
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-filename
		 */
		filename: '[name].bundle.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: '[file].map',

		/** The filename of non-entry chunks as relative path
		 * inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
		 */
		chunkFilename: '[id].chunk.js'

	},
	stats: {
		colors: true,
		modules: true,
		reasons: true,
		errorDetails: true
	},
	plugins: [
		new ExtractTextPlugin({filename: '[name].css', disable: true, allChunks: true}),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		})
	],
	devServer: {

		port: METADATA.port,
		host: METADATA.host,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 500,
			poll: 1000
		},
		// outputPath: helpers.root('src'),
		stats: 'minimal'
	}
}, userConfig);
