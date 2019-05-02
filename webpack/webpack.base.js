const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
module.exports = {
	entry: {
		main: './src/index.js',
		// 也会生成一个map文件
		// dll: './src/dll.js',
	},
	output: {
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		// tree shaking
		usedExports: true,
		// 代码分割
		splitChunks: {
			chunks: 'all',
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		mainFiles: ['index'],
		alias: {
			views: path.resolve(__dirname, '../src/views'),
			components: path.resolve(__dirname, '../src/components'),
			styles: path.resolve(__dirname, '../src/styles'),
			images: path.resolve(__dirname, '../src/images'),
			constant: path.resolve(__dirname, '../src/constant'),
			utils: path.resolve(__dirname, '../src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images/',
						limit: 2048,
					},
				},
			},
			{
				test: /\.(eot|ttf|svg|woff)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'iconfont/',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		// new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
		// new FriendlyErrorsWebpackPlugin({
		// 	compilationSuccessInfo: {
		// 		messages: [`Your application is running here: `],
		// 	},
		// 	// onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
		// 	clearConsole: true,
		// }),
	],
}
