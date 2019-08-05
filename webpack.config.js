const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    "entry": [
        "/Users/haemp/projects/ahlgren.co/Setup.jsx"
    ],
    "target": "web",
    "output": {
        "path": "/Users/haemp/projects/ahlgren.co/public",
        "filename": "Ahlgren.min.js"
    },
    "resolve": {
        "modules": [
            "/Users/haemp/projects/ahlgren.co",
            "node_modules"
        ],
        "alias": {
            "entryRoot": "/Users/haemp/projects/ahlgren.co"
        },
        "extensions": [
            ".js",
            ".json",
            ".jsx",
            ".ts",
            ".tsx",
            ".vue"
        ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      module: 'empty'
    },
    plugins: [
        new MinifyPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(jsx?)$/i,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [require("babel-preset-stage-2"), require("babel-preset-react")]
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
            test: /\.react\.svg$/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: [require("babel-preset-react")]
                }
              },
              {
                loader: "svgr/webpack",
                options: { babel: false, svgo: false }
              }
            ]
          },
        {
          test: /\.(gif|png|wav|flac|mp3|jpe?g|svg|mp4|svg)$/i,
          exclude: /\.react\.svg$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: "/Users/haemp/projects/ahlgren.co",
                name: "[path][name].[ext]"
              }
            }
          ]
        }
      ]
    }}