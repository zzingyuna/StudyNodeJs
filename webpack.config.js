const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig)
const path = require("path");
//HTML 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map", //크롬에서 디버깅 가능하도록 원본코드같이 bundle
  entry: "./server.js", //진입점
  output: {
    path: path.resolve(__dirname, "public"), // bundle만들어질 장소
    filename: "index.bundle.js", // bundle 될 파일 이름
    publicPath: "/" //웹팩 미들웨어 장소
  },
  module: {
    rules: [
    ],
  },
  plugins: [
  ]
};