const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
	entry: {
		main: '../index.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			chacheGroups: {
				vendors: false,
				default: false,
			},
		},
		runtimeChunk: {
			name: 'runtime',
		},
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		mainFiles: ['index'],
		alias: {
			components: path.resolve(__dirname, '../src/components'),
			constant: path.resolve(__dirname, '../src/constant'),
			images: path.resolve(__dirname, '../src/images'),
			styles: path.resolve(__dirname, '../src/styles'),
			utils: path.resolve(__dirname, '../src/utils'),
			views: path.resolve(__dirname, '../src/views'),
		},
	},
	module: {
		relus: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								useBuildtIns: 'usage',
								targets: {
									chrome: '67',
								},
							},
						],
					],
				},
				plugins: [
					[
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-transform-runtime',
						{
							corejs: 2,
							helpers: true,
							regenerator: true,
							kuseESModules: false,
						},
					],
					'@babel/presset-react',
				],
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images',
						limit: 2048,
					},
				},
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: true,
						},
					},
					'less-loader',
					'postcss-loader',
				],
			},
			{
				text: /\.(eot|ttf|svg)$/,
				use: {
					loader: 'file-loader',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html', // 写一下模版，需要一个挂载dom
		}),
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'),
		}),
	],
}
