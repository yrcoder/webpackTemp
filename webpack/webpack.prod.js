const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const prodConfig = {
	mode: 'production',
	devtool: 'cheap-module-source-map',
	optimization: {
		minimizer: [new optimizeCssAssetsWebpackPlugin({})],
	},
	module: {
		rules: [
			{
				test: /\.(le|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							// modules: true,
						},
					},
					{
						loader: 'less-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[name].chunk.[hash].css',
		}),
	],
}
module.exports = merge(baseConfig, prodConfig)
