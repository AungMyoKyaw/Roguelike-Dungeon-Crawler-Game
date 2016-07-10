var webpack = require('webpack');
module.exports = {
	entry:['./app/js/index.jsx'],
	output:{
		filename:'build.js',
		path:__dirname + '/build'
	},
	module:{
		loaders:[
		{
			test:/\.jsx$/,
			include:__dirname + '/app/js',
			loader:'babel'
		},
		{
			test:/\.scss$/,
			include:__dirname + '/app/style',
			loader:'style!css!sass',
		}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV':JSON.stringify('production'),
			}
		}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.DedupePlugin(),
	]
};
