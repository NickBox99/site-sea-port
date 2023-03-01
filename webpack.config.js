import * as pathNode from 'path'
import dotenv from 'dotenv'
import webpack from 'webpack'
const srcFolder = 'src/assets'
const buildFolder = 'build'

const path = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(buildFolder)
}

export const webpackConfig = (isMode) => ({
  entry: ['@babel/polyfill', `${path.src}/js/index.js`],
  mode: isMode ? 'development' : 'production',
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: pathNode.resolve('.temporary_cache'),
  },
  output: {
    path: `${path.build}/js`,
    filename: 'main.min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})
