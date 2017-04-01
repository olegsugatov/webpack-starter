var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

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
				use: ['style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: 'pug-loader'
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
  		new ExtractTextPlugin("app.css"),
  		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NamedModulesPlugin(),
	]
}