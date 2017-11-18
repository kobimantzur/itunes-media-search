var express = require('express')
var app = express()
var port = process.env.port || 3000
var path = require('path');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);
