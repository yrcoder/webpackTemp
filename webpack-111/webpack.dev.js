const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const devConfig = {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,
		overlay: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	optimization: {
		usedExports: true,
	},
}
module.exports = merge(baseConfig, devConfig)
