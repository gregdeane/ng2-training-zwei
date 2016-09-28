const helpers = require('../helpers');

module.exports = [
  {
    test: /\.ts$/,
    loader: 'awesome-typescript-loader',
    query: {
      // use inline sourcemaps for "karma-remap-coverage" reporter
      sourceMap: false,
      inlineSourceMap: true,
      compilerOptions: {
        removeComments: true
      }
    },
    exclude: [/\.e2e\.ts$/]
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
    exclude: [helpers.root('src/index.html')]
  },
  {
    test: /\.css$/,
    loaders: ['to-string-loader', 'css-loader'],
    exclude: [helpers.root('src/index.html')]
  },
  {
    test: /\.scss$/,
    exclude: [helpers.root('src/index.html')],
    loaders: ['raw-loader', 'sass-loader']
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: [helpers.root('src/index.html')]
  }
];
