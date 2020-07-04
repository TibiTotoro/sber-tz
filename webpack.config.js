const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => ({
    entry: path.resolve(__dirname, "src/index.jsx"), 
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            },
        },
        {
            test: /\.module\.scss$/,
            exclude: /node_modules/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development'
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    }
                },
                "postcss-loader",
                {
                    loader: "sass-loader",
                }
            ]
        },
        {
            test: /\.(scss|css)$/,

            use: [
                argv.mode == "development" ? {
                    loader: "style-loader"
                } : MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        modules: false
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ],
            exclude: [/node_modules/, /\.module\.scss$/],
        },
        {
            test: /\.(png|jpg|gif|mp4)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    useRelativePath: true
                }
            }

            ]
        },

        {
            test: /\.svg$/,
            use: [{
                loader: "babel-loader"
            },
            {
                loader: "react-svg-loader",
                options: {
                    svgo: {
                        plugins: [
                            { removeTitle: true },
                            { cleanupIDs: false },
                            { removeViewBox: false }
                        ],
                    }
                }
            }
            ]
        }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 3100,
        open: 'Chrome',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss'],  
        alias: {
            '~src': path.resolve(__dirname, "src"),
            '~components': path.resolve(__dirname, "src/components"),
            '~styles': path.resolve(__dirname, "src/styles/"),
            '~context': path.resolve(__dirname, "src/context/"),
        }    
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Сбербанк - тестовое',
            meta: {
              description:
                'Сбербанк - тестовое',             
            },
            template: 'src/index.html',            
          }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css"
        }),
        new FaviconsWebpackPlugin('src/assets/icon/icon512.png')
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    }
});
