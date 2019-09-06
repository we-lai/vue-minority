const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    'demo': resolve('./examples/index.js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    open: true,
    host: '0.0.0.0',
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhiteSpace: false
              }
            }
          },
          {
            loader: '@tianyong90/vue-markdown-loader',
            options: {
              contentCssClass: 'markdown-body',
              markdown: {
                lineNumbers: true, // 启用行号
              }
            }
          }
        ]
      },
      {
        test: /\.(ttf|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'examples/index.tpl',
    }),
  ]
}
