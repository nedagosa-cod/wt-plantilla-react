const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimiZerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
	entry: './src/index.jsx',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'Web Tranining'),
		filename: 'noTocar/bundle.js',
		publicPath: './', //ALERTA configuracion de produccion (/)
		assetModuleFilename: 'noTocar/assets/[name][ext]', //*
		sourceMapFilename: '[file].map', // crea archvo map que mapea el cod de produccion a development
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
				type: 'asset/resource', // *
			},
			{
				test: /\.(webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: path.join(__dirname, '/public/index.html'),
			filename: 'Web Training.html', //solo en produccion
		}),
		new MiniCssExtractPlugin({
			// extrae el css del javascript para empaquetarlo como archivo aparte
			filename: 'noTocar/styles.css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.join(__dirname, '/src/assets/images/'), //deja por separado las imagenes de las bases de datos
					to: 'noTocar/imagenes',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/src/data/plantillas'),
					to: 'noTocar/plantillas',
					noErrorOnMissing: true,
				},
				{
					//cargan los iconos del corrector
					from: path.join(__dirname, '/src/components/Corrector/assets'),
					to: 'noTocar/noTocar/assets',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/src/assets/images/NOTICIAS'),
					to: 'BASES/NOTICIAS',
					noErrorOnMissing: true,
				},
				{
					from: path.join(__dirname, '/src/assets/images/flujogram'),
					to: 'noTocar/imagenes/flujogram',
					noErrorOnMissing: true,
				},
			],
		}),
	],
	optimization: {
		// optimiza el codigo
		minimize: true,
		minimizer: [new CssMinimiZerPlugin(), new TerserPlugin()],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			// evitar estar poniendo rutas relativas en los import
			'@images': path.join(__dirname, '/src/assets/images/'),
			'@components': path.join(__dirname, '/src/components/'),
			'@styles': path.join(__dirname, '/src/styles/'),
			'@icons': path.join(__dirname, '/src/icons/'),
			'@/lib': path.join(__dirname, '/src/lib/'),
			'@/components': path.join(__dirname, '/src/components/'),
			'@/icons': path.join(__dirname, '/src/icons/'),
			'@/context': path.join(__dirname, '/src/context/'),
			'@/data': path.join(__dirname, '/src/data/'),
			'@/assets': path.join(__dirname, '/src/assets/'),
		},
	},
	devServer: {
		port: 0,
		open: true,
		// historyApiFallBack: true
	},
	performance: {
		//
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
}
