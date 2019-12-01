const path = require("path");
const webpack = require("webpack");

const REACT_BASE_PATH = "../";

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool:
    process.env.NODE_ENV === "production"
      ? "none"
      : "cheap-module-eval-source-map",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@Components": path.resolve(
        __dirname,
        REACT_BASE_PATH + "src/components/"
      ),
      "@Shared": path.resolve(__dirname, REACT_BASE_PATH + "src/shared/")
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    library: "WriteDownEditor",
    libraryTarget: "umd"
  },
  devServer: {
    contentBase: path.resolve(__dirname, REACT_BASE_PATH),
    disableHostCheck: true,
    port: 8080,
    compress: true,
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      },
      {
        test: /.tsx{0,1}$/,
        use: ["ts-loader"]
      }
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
