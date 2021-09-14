const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const moveProps = require("postcss-move-props-to-bg-image-query");
const { NODE_ENV = "production" } = process.env;

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name]/styles.css" }),
    new RemoveEmptyScriptsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "src", "icon.png"), to: "icon.png" },
        {
          from: path.join(__dirname, "src", "icon-off.png"),
          to: "icon-off.png",
        },
        {
          from: path.join(__dirname, "src", "manifest.json"),
          to: "manifest.json",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
  ],
  entry: {
    action: path.join(__dirname, "src", "action.ts"),
    inject: path.join(__dirname, "src", "inject.ts"),
    "hot-reload": path.join(__dirname, "src", "hot-reload.ts"),
    acorn: path.join(__dirname, "src", "acorn", "styles.scss"),
    quercus: path.join(__dirname, "src", "quercus", "styles.scss"),
    weblogin: path.join(__dirname, "src", "weblogin", "styles.scss"),
    popup: path.join(__dirname, "src", "popup", "popup.ts"),
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
        test: /\.svg(\?.*)?$/,
        use: ["svg-transform-loader"],
        type: "asset/inline",
      },
      {
        test: /\.(png|jpg|gif|webp|pdf)$/,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [moveProps()],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  watch: NODE_ENV === "development",
};
