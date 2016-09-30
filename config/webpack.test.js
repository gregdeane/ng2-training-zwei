const helpers = require('./helpers');
const loaders = require('./loaders/test.loaders');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

// http://webpack.github.io/docs/configuration.html#cli
module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['', '.ts', '.js'],
      root: helpers.root('src'),
    },
    module: {
      loaders: loaders,
      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: [helpers.root('node_modules')]
        },
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        }
      ],
      postLoaders: [
        {
          test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
          include: helpers.root('src'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }
      ]
    },
    sassLoader: {
      includePaths: ['./src/assets', './node_modules/bootstrap/scss']
    },
    plugins: [

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
        }
      }),
    ],

    /**
     * Static analysis linter for TypeScript advanced options configuration
     * Description: An extensible linter for the TypeScript language.
     *
     * See: https://github.com/wbuchwalter/tslint-loader
     */
    tslint: {
      emitErrors: false,
      failOnHint: false,
      resourcePath: 'src'
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: 'window',
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
