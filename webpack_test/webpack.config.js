var webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname, 'public/assets'),
        stats: 'errors-only',
        open: true,
        host: '0.0.0.0',
        port: 8888,
        compress: true,
        inline: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            // 'process.env.NODE_ENV': JSON.stringify('development'), //---- No need to set it because we set mode:'development' at top
            'process.env.BASE_HREF': JSON.stringify('/')
        })
    ],
});