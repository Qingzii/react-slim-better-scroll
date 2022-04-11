//config-overrides.js
const {
  override,
  addPostcssPlugins,
  addDecoratorsLegacy,
  addWebpackPlugin,
  addWebpackModuleRule,
  adjustStyleLoaders,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = override(
  process?.env.NODE_ENV === "production" &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      })
    ),

  addPostcssPlugins([
    require("postcss-pxtorem")({
      rootValue: 16,
      selectorBlackList: [],
      propList: ["*"],
      minPixelValue: 1,
    }),
  ]),

  addWebpackModuleRule(
    // 处理scss和less互相使用
    {
      test: /\.scss$/,
      issuer: /\.less$/,
    }
  ),
  adjustStyleLoaders((rule) => {
    //scss全局变量
    if (rule.test.toString().includes("scss")) {
      rule.use.push({
        loader: require.resolve("sass-resources-loader"),
        options: {
          resources: "./src/assets/css/color.scss",
        },
      });
    }
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),

  (config) => {
    if (process?.env.NODE_ENV === "production") config.devtool = false;
    return config;
  }
);
