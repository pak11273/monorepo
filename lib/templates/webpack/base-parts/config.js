// stubs
const path = { resolve: (a, b) => null, join: () => null }
const MiniCssExtractPlugin = function () {
  loader: null
}
const HtmlWebpackPlugin = function () {
  null
}
const BundleAnalyzerPlugin = function () {
  null
}

module.exports = {
  entry: ["react-hot-loader/patch", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 8080,
    publicPath: "calhost:8080/dist/",
    hotOnly: true,
  },
  plugins: [
    HtmlWebpackPlugin({ appMountId: "root", filename: "index.html" }),
    BundleAnalyzerPlugin({ analyzerMode: "static", openAnalyzer: false }),
    MiniCssExtractPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
}
