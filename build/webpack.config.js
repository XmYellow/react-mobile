const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')
const path = require('path')
const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')], // ant-design
    extensions: ['', '.web.js', '.js', '.jsx', '.json']// web.js 必须在js前面
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')


webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  chunkFilename: '[chunkhash].js',
  path: paths.dist(),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: config.compiler_babel
}, {
  test: /\.json$/,
  loader: 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'
webpackConfig.module.loaders.push({
  test: /\.less/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'less?sourceMap'
  ]
})

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=font/opentype'},
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]'},
  // {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=image/svg+xml'},
  {test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192'},
  {test: /\.(svg)$/i,loader: 'svg-sprite',include: [
    require.resolve('antd-mobile').replace(/warn\.js$/, '')
  ]}  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true
    })
  )
}

// ------------------------------------
// ant-design
// ------------------------------------

module.exports = webpackConfig