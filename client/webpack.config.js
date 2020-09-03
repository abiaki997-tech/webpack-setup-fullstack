const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports={
  entry:'./src/app.js',
  output:{
    path:path.join(__dirname , '/public'),
    filename:'bundle.js'
  },
  // babel,eslint-module
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:["babel-loader","eslint-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png|svg|jpe?g|gif$/,
        use: ["file-loader"],
      },
       ]
  },
  // absolute path
  resolve:{
    modules:[__dirname,"node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"]
  },
  // plugins
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  devtool:"cheap-module-source-map",
  devServer: {
    proxy:{
     '/api':'http://localhost:6000'
    },
    contentBase: path.join(__dirname, 'src'),
    // compress: true,
    // hot:true,
    port: 4000
  }
}