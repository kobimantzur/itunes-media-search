var webpack = require('webpack');
var path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015', 'stage-0', 'react']
         }
       },
      {
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {url: false}
            },
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }

    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })
  ]
};
if (inProduction){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}
