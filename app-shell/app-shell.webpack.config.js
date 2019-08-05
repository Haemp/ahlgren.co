const MinifyPlugin = require("babel-minify-webpack-plugin");
const TransformClassProps = require("babel-plugin-transform-class-properties");
const path = require('path');

module.exports = {
    entry: [
        path.join(__dirname, "AppShell.js")
    ],
    devtool: 'inline',
    output: {
        "path": path.join(__dirname, '..', "public"),
        "filename": "AppShell.min.js"
    },
    plugins: [
      //new MinifyPlugin()
    ],
    module: {
      rules:[
        {
          test: /\.js$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ['babel-preset-env', {debug: true}]
                ],
                //plugins: ['babel-plugin-transform-class-properties']
              }
            }
          ]
        },
        { 
          test: /\.(gif|png|wav|flac|mp3|jpe?g|svg|mp4|svg)$/i,
          exclude: /react\.svg/i,
          use: [
            {
              loader: "file-loader",
              options: {
                emitFile: false,
                context: "/Users/haemp/projects/ahlgren.co",
                name: "[path][name].[ext]"
              }
            }
          ]
        }
      ]
    }
  }