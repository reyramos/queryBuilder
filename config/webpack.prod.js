const path = require("path");

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeJsPlugin = require('optimize-js-plugin');


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
	devtool: 'source-map',
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
		filename: '[name].[chunkhash].bundle.js',

		/**
		 * The filename of the SourceMaps for the JavaScript files.
		 * They are inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
		 */
		sourceMapFilename: '[name].[chunkhash].bundle.map',

		/**
		 * The filename of non-entry chunks as relative path
		 * inside the output.path directory.
		 *
		 * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
		 */
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	plugins: [
		/**
		 * Webpack plugin to optimize a JavaScript file for faster initial load
		 * by wrapping eagerly-invoked functions.
		 *
		 * See: https://github.com/vigneshshanmugam/optimize-js-plugin
		 */

		new OptimizeJsPlugin({
			sourceMap: false
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			test: /\.html$/,
			options: {
				"html-minify-loader": {
					empty: true,
					cdata: true,
					comments: false,
					dom: {                            		// options of !(htmlparser2)[https://github.com/fb55/htmlparser2]
						lowerCaseAttributeNames: false     	// do not call .toLowerCase for each attribute name (Angular2 use camelCase attributes)
					}
				},
				htmlLoader: {
					minimize: true,
					removeAttributeQuotes: false,
					caseSensitive: true,
					customAttrSurround: [
						[/#/, /(?:)/],
						[/\*/, /(?:)/],
						[/\[?\(?/, /(?:)/]
					],
					customAttrAssign: [/\)?\]?=/]
				}
			}
		}),
		//https://github.com/olov/ng-annotate/blob/master/OPTIONS.md
		new ngAnnotatePlugin({
			add: true
		}),
		new webpack.IgnorePlugin(/spec\.js$/),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 51200 // ~50kb
		}),
		// new UglifyJSPlugin(),
		new UglifyJSPlugin({
			mangle: {
				screw_ie8: true,
				except: ['$super', '$', 'exports', 'require']
			},
			compress: {
				warnings: true,
				screw_ie8: true,
				sequences: true,
				dead_code: true,
				conditionals: true,
				booleans: true,
				unused: true,
				if_return: true,
				join_vars: true,
				drop_console: true
			},
			output: {
				comments: false
			}
		}),
		new ExtractTextPlugin('[name].[hash].css'),
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(ENV)
			}
		}),
		new HtmlWebpackPlugin({
			hash: true,
			baseUrl: "//reyramos.github.io/queryBuilder/",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				collapseBooleanAttributes: false,
				removeCommentsFromCDATA: true
			},
			template: helpers.root("src", "index.ejs"),
			filename: "index.html",
			chunksSortMode: "dependency"

		}),
		// new CompressionPlugin({
		// 	asset: '[path].gz[query]',
		// 	algorithm: 'gzip',
		// 	test: /\.js$|\.html$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// }),
		new CopyWebpackPlugin([{
			context: path.resolve(helpers.root('src'), 'assets'),
			from: {glob: '**/*', dot: true},
			ignore: ['.gitkeep'],
			to: path.resolve(helpers.root('dist'), 'assets')
		},
			{
				from: path.resolve(helpers.root('src', '.htaccess')),
				to: path.resolve(helpers.root('dist'))
			}
		])
	]
});
