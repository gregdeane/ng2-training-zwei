const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular 2 Training Zwei',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/**
 * Configuration
 * http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  isProd = options.env === 'production';
  return {

    // static metadata for index.html
    metadata: METADATA,

    // cache generated modules and chunks to improve performance for multiple incremental builds.
    // enabled by default in watch mode. pass false to disable it.
    // http://webpack.github.io/docs/configuration.html#cache
    //cache: false,

    // entry point for the bundle
    // http://webpack.github.io/docs/configuration.html#entry
    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'
    },

    // options affecting the resolving of modules.
    // http://webpack.github.io/docs/configuration.html#resolve
    resolve: {

      // array of extensions that should be used to resolve modules.
      // http://webpack.github.io/docs/configuration.html#resolve-extensions
      extensions: ['', '.ts', '.js', '.json'],

      // ensure root is src
      root: helpers.root('src'),

      // remove other default values
      modulesDirectories: ['node_modules'],

    },

    // options affecting the normal modules.
    // http://webpack.github.io/docs/configuration.html#module
    module: {

      // array of applied pre and post loaders.
      // http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
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

      // array of automatically applied loaders.
      // IMPORTANT: the loaders here are resolved relative to the resource which they are applied to.
      // this means they are not resolved relative to the configuration file.
      // http://webpack.github.io/docs/configuration.html#module-loaders
      loaders: [

        // typescript loader support for .ts and Angular 2 async routes via .async.ts
        // replace templateUrl and stylesUrl with require()
        // https://github.com/s-panferov/awesome-typescript-loader
        // https://github.com/TheLarkInn/angular2-template-loader
        {
          test: /\.ts$/,
          loaders: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        // json loader support for *.json files.
        // https://github.com/webpack/json-loader
        {
          test: /\.json$/,
          loader: 'json-loader'
        },

        // to-string and css-loader support for *.css files
        // returns file content as string
        {
          test: /\.css$/,
          loaders: ['to-string-loader', 'css-loader']
        },

        // raw loader support for *.html
        // returns file content as string
        // https://github.com/webpack/raw-loader
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },

        // file loader for supporting images, for example, in CSS files.
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        }
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

    // add additional plugins to the compiler.
    // http://webpack.github.io/docs/configuration.html#plugins
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
     * Description: Node configuration
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
}
