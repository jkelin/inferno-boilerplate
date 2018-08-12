const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prod = process.env.NODE_ENV === 'production';
const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
}

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'source-map' : 'eval-source-map',

  entry: {
    bundle: [
      path.resolve(paths.src, 'Entry.tsx')
    ]
  },
  output: {
    path: paths.dist,
    filename: prod && 'static/js/[name].[chunkhash:8].js' || undefined,
    chunkFilename: prod && 'static/js/[name].[chunkhash:8].chunk.js' || undefined,
  },

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      'inferno': prod ? path.resolve(__dirname, 'node_modules/inferno/index.esm.js') : path.resolve(__dirname, 'node_modules/inferno/dist/index.dev.esm.js'),
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat',
      'react-redux': 'inferno-redux'
    }
  },

  module: {
    rules: [
      {
        exclude: [
          /\.ejs$/,
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.(ts|tsx)(\?.*)?$/,
          /\.css$/,
          /\.less$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.md$/,
        ],
        loader: [require.resolve('file-loader')],
        // options: {
        //   name: 'static/media/[name].[hash:8].[ext]',
        // },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: [require.resolve('url-loader')],
        // options: {
        //   limit: 10000,
        //   name: 'static/media/[name].[hash:8].[ext]',
        // },
      },
      {
        test:/\.(less|css)$/,
        use:[
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "plugins": [["babel-plugin-inferno", {"imports": true}]]
            }
          },
          // { loader: 'cache-loader' },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //       // there should be 1 cpu for the fork-ts-checker-webpack-plugin
          //       workers: require('os').cpus().length - 1,
          //   },
          // },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: !prod,
              experimentalWatchApi: true,
            }
          }
        ],
      },
    ]
  },

  plugins: [
    !prod && new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true
    }),
    // new webpack.ProvidePlugin({
    //   'react-lifecycles-compat': path.resolve(paths.src, 'shim.js')
    // }),
    new HtmlWebpackPlugin({
      template: 'ejs-loader!' + path.resolve(paths.src, 'index.ejs'),
      NODE_ENV: process.env.NODE_ENV
    }),
    !prod && new webpack.HotModuleReplacementPlugin(),
    process.env.WEBPACK_ANALYZE && new BundleAnalyzerPlugin({analyzerMode: 'static', generateStatsFile: true}),
    prod && new MiniCssExtractPlugin({
      filename: prod && 'static/css/[name].[chunkhash:8].css' || undefined,
      chunkFilename: prod && 'static/css/[name].[chunkhash:8].chunk.css' || undefined,
    }),
    // prod && new PreloadWebpackPlugin(),
  ],

  optimization: {
    minimizer: [new TerserPlugin({
      sourceMap: true,
      terserOptions: {
        compress: {
          ecma: 6,
          passes: 3,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_methods: true,
          unsafe_proto: true,
          hoist_funs: true,
          hoist_vars: true,
        },
        ecma: 6,
        ie8: false,
        safari10: false
      }
    })]
  },

  devServer: {
    hot: !prod,
    historyApiFallback: { disableDotRule: true },
    port: 3000,
    stats: 'errors-only'
  }
};


module.exports.plugins = module.exports.plugins.filter(Boolean);
