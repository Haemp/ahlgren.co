const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    "entry": [
        "/Users/haemp/projects/ahlgren.co/loading/Loading.js"
    ],
    "target": "web",
    "output": {
        "path": "/Users/haemp/projects/ahlgren.co/loading",
        "filename": "./public/Loading.min.js"
    },
    "resolve": {
        "modules": [
            "/Users/haemp/projects/ahlgren.co/loading",
            "node_modules"
        ],
        "alias": {
            "entryRoot": "/Users/haemp/projects/ahlgren.co/loading"
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
    "resolveLoader": {
        "modules": [
            "/Users/haemp/projects/sideview/desktop/node_modules"
        ],
        "extensions": [
            ".js",
            ".json"
        ],
        "mainFields": [
            "loader",
            "main"
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
    ]   
}