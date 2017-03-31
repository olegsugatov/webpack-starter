var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
			 test: /\.css$/, 
			 use: ExtractTextPlugin.extract({
			 	fallback: 'style-loader',
			 	use: [ 'css-loader', 'sass-loader' ]
				})
			}
	 	]
	},
	plugins: [ 
		new HtmlWebpackPlugin({
    		title: 'Project Demo',
    		minify: {
    			collapseWhitespace: true
    		},
    		hash: true,
    		template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
  		}),
  		new ExtractTextPlugin("app.css"),
	]
}