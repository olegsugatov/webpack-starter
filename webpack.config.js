var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader' ];
var cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	loader: ['css-loader', 'sass-loader'],
	publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: './src/app.js',
		contact: './src/contact.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/, 
				use: cssConfig
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=[hash:6].[ext]&outputPath=img/'
          			// 'image-webpack-loader'

				]
			}
	 	]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
  		compress: true,
  		stats: 'errors-only',
  		hot: true,
  		open: true
	},
	plugins: [ 
		new HtmlWebpackPlugin({
    		title: 'Project Demo',
    		minify: {
    			collapseWhitespace: true
    		},
    		hash: true,
    		excludeChunks: ['contact'],
    		template: './src/index.pug' // Load a custom template (ejs by default see the FAQ for details)
  		}),
  		new HtmlWebpackPlugin({
    		title: 'Contact Page',
    		hash: true,
    		chunks: ['contact'],
    		filename: 'contact.html',
    		template: './src/contact.pug'
  		}),
  		new ExtractTextPlugin({
  			filename: 'app.css',
  			disable: !isProd,
  			allChunks: true
  		}),
  		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
	]
}