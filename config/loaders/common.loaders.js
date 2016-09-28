const helpers = require('../helpers');

module.exports = [
  {
    test: /\.ts$/,
    loaders: [
      'awesome-typescript-loader',
      'angular2-template-loader'
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.css$/,
    loaders: ['to-string-loader', 'css-loader']
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    loaders: ['raw-loader', 'sass-loader']
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: [helpers.root('src/index.html')]
  },
  {
    test: /\.(jpg|png|gif)$/,
    loader: 'file'
  }
];
