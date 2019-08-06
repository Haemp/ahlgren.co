// @ts-check
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    target: 'web',
    optimization: {
        minimizer: [
            new Terser({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    mangle: true,
                    compress: true
                }
            })
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                require('@babel/preset-env'),
                                {
                                    targets: 'defaults',
                                    useBuiltIns: 'usage',
                                    corejs: 2
                                }
                            ],
                            require('@babel/preset-react')
                        ],
                        plugins: [
                            [
                                require('@babel/plugin-proposal-decorators'),
                                { legacy: true }
                            ],
                            require('babel-plugin-transform-flow-strip-types'),
                            require('babel-plugin-transform-class-properties'),
                            [
                                require('babel-plugin-styled-components'),
                                {
                                    ssr: false
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.react\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // cacheDirectory: true,
                            presets: [require('@babel/preset-react')]
                        }
                    },
                    {
                        loader: '@svgr/webpack',
                        options: { babel: false, svgo: false }
                    }
                ]
            },
            {
                test: /\.(gif|png|wav|flac|mp3|jpe?g|svg|woff|woff2|ttf|eot)$/i,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: './',
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: path.join(__dirname, './dist/index.html')
        })
    ]
};
