const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyPlugin = require("copy-webpack-plugin");
const { NODE_ENV = "production" } = process.env;

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name]/styles.css" }),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/icon.png", to: "icon.png" },
        { from: "./src/icon-off.png", to: "icon-off.png" },
        { from: "./src/manifest.json", to: "manifest.json" },
      ],
    }),
  ],
  entry: {
    action: "./src/action.ts",
    inject: "./src/inject.ts",
    "hot-reload": "./src/hot-reload.ts",
    acorn: "./src/acorn/styles.scss",
    quercus: "./src/quercus/styles.scss",
    weblogin: "./src/weblogin/styles.scss",
  },
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpg|svg|gif|webp|pdf)$/,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  watch: NODE_ENV === "development",
};
