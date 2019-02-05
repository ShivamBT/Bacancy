const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./index.js",
    output: {
        filename: '[name]-[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    context: path.resolve(__dirname, 'src'),
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
     /*   new MiniCssExtractPlugin({
            filename: "[name]-[chunkhash].css",
            chunkFilename: "[id].css"
        }),*/
        new CopyWebpackPlugin([
             { from: 'assets/', to: 'assets' }
         ])
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './assets/images/',
                        }
                    }]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                  /* {
                        loader: MiniCssExtractPlugin.loader,
                    },*/
                   "style-loader",
                    "css-loader"
                ]
                
                
             }
        ]
    }
}