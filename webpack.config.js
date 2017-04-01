var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
			 test: /\.css$/, 
			 use: ExtractTextPlugin.extract({
			 	fallback: 'style-loader',
			 	use: [ 'css-loader', 'sass-loader' ]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
	 	]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
  		compress: true,
  		stats: 'errors-only',
  		open: true
	},
	plugins: [ 
		new HtmlWebpackPlugin({
    		title: 'Project Demo',
    		minify: {
    			collapseWhitespace: true
    		},
    		hash: true,
    		excludeChunks: ['contact']
    		template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
  		}),
  		new HtmlWebpackPlugin({
    		title: 'Contact Page',
    		hash: true,
    		chunks: ['contact'],
    		filename: 'contact.html',
    		template: './src/contact.html'
  		}),
  		new ExtractTextPlugin("app.css"),
	]
}