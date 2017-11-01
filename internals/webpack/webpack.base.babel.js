/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const autoprefixer = require('autoprefixer');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'bin'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    rules: [{
      test: /\.(js|jsx)$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]__[name]__[local]___[hash:base64:5]!postcss-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]__[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif|jpeg)$/,
      loaders: ['file-loader?limit=5000&hash=sha512&digest=hex&size=16&name=[name].[ext]?[hash]']
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'url-loader?limit=10000',
    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    /**
     * Plugin: NamedModulesPlugin (experimental)
     * Description: Uses file names as module name.
     *
     * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
     */
    new webpack.HashedModuleIdsPlugin(),
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(process.cwd(), 'vendor'), to: 'vendor' },
      { from: path.resolve(process.cwd(), 'app/assets'), to: 'assets' }
    ]),
    new webpack.LoaderOptionsPlugin({
      options: {
        // A temporary workaround for `scss-loader`
        // https://github.com/jtangelder/sass-loader/issues/298
        // output: {
        //   path: configuration.output.path
        // },
        postcss: [autoprefixer({ browsers: ['ie >= 9', 'Edge >= 12', 'Firefox >= 28', 'Chrome >= 21', 'safari >= 6'] })],

        // A temporary workaround for `css-loader`.
        // Can also supply `query.context` parameter.
        // context: configuration.context
        // 处理使用 css-module 时，[path] 无法获取到真实的路径。
        // https://github.com/webpack/loader-utils/issues/51
        context: __dirname,
      }
    })
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
