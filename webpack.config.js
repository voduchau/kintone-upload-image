const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/extension/background.ts",
    contentScript: "./src/extension/contentScript.ts",
    content: "./src/content.ts"
  },
  output: {
    path: path.resolve("build/extension/js"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|jpg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: path.resolve("public/images"),
        to: path.resolve("build/extension/images")
      },
      {
        from: path.resolve("manifest.json"),
        to: path.resolve("build/extension/")
      }
    ]),
    new ExtensionReloader({
      port: 9001,
      reloadPage: true,
      entries: {
        contentScript: ["contentScript"],
        background: "background"
      }
    })
  ]
};
