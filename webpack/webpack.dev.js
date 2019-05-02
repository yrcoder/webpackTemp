const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const devConfig = {
	mode: 'development',
	devtool: 'cheap-inline-source-map',
	devServer: {
		// devServer在dist文件夹下起一个服务器，当代码更新的时候自动打包
		contentBase: path.resolve(__dirname, 'dist'),
		port: 4000,
		open: true,
		hot: true,
	},
	optimization: {
		usedExports: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
}
module.exports = merge(baseConfig, devConfig)
