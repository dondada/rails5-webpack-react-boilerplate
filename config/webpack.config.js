"use strict"

var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var StatsPlugin = require('stats-webpack-plugin')

// must match config.webpack.dev_server.port
var devServerPort = 3808

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production'

var config = {
  entry: {
    // Sources are expected to live in $app_root/app/assets
    application: './app/assets/javascripts/application.js'
  },

  output: {
    // Build assets directly in to public/assets/, let webpack know
    // that all webpacked assets start with assets/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'public', 'assets'),
    publicPath: '/assets/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js'
  },

  // Remove file extension requirements from require and import calls
  resolve: {
    root: path.join(__dirname, '..', 'app', 'assets', 'javascripts'),
    extensions: ["", ".js", ".jsx"],
    moduleDirectories: ['node_modules', 'lib/assets', 'vendor/assets/javascripts']
  },

  module: {
    loaders: [
      // Process .js and .jsx files for ES6 and React
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel?presets[]=react,presets[]=es2015"
      },
      // Embed images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file'
      },
      // Process normal CSS files
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css!postcss'
      },
      // Process SASS files
      {
        test: /\.s?css$/,
        loader: 'style!css!sass!postcss'
      },
      // Embed fonts
      {
        test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
        loader: "file?name=[name].[ext]"
      }
    ]
  },

  postcss: function(){
    return [autoprefixer({
      browsers: ['last 2 versions']
    })]
  },

  plugins: [
    // Expose some modules globally to every module (so you don't have to explicitly require them)
    new webpack.ProvidePlugin({
      React: "react"
    }),
    // must match Rails.application.config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    })
  ]
}

// Production compilation
if (production) {
  config.plugins.push(
    // https://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.NoErrorsPlugin(),
    // Compress output
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    // Define environment variables
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin(),
    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin()
  )
} else {
  // Webpack Dev Server configuration and prevent CORS errors dealing with multiple localhost ports (not an issue in production)
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }

  // Public path for assets
  config.output.publicPath = '//localhost:' + devServerPort + '/assets/'

  // Source maps
  config.devtool = 'cheap-module-eval-source-map'
}

module.exports = config
