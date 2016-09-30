const webpack = require('webpack');
const helpers = require('./helpers');
const loaders = require('./loaders/common.loaders');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const METADATA = {
  isDevServer: helpers.isWebpackDevServer()
};

// http://webpack.github.io/docs/configuration.html#cli
module.exports = function (options) {
  return {
    metadata: METADATA,
    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'
    },
    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
      modules: [helpers.root('src'), 'node_modules']
    },
    module: {
      loaders: loaders,
      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('src')]
        },
      ],
      postLoaders: [
        {
          test: /\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
            replace: 'var sourceMappingUrl = "";',
            flags: 'g'
          }
        }
      ]
    },
    sassLoader: {
      includePaths: ['./src/assets', './node_modules/bootstrap/scss']
    },
    plugins: [
      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),

      /**
       * Plugin: ForkCheckerPlugin
       * Description: do type checking in a separate process, so webpack doesn't need to wait.
       * https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),

      /**
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between pages.
       *
       * https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),

      /**
       * Plugin: CopyWebpackPlugin
       * Description: Copy files and directories in webpack.
       *
       * https://www.npmjs.com/package/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),

      /**
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      }),

      /**
       * Plugin: HtmlHeadConfigPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is a map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

    ],

    /**
     * Include polyfills or mocks for various node stuff
     *
     * https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
