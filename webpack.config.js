// webpack.config.js

  const path = require('path')
  const VueLoaderPlugin = require('vue-loader/lib/plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
    context: __dirname,
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      },
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          use: {
            loader: 'vue-loader'
          }
        }
      ]
    },
    devtool: 'sourcemap',
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }