const webpack = require('webpack')
const path = require('path')
// const miniCssPlugin = require('mini-css-extract-plugin')
// const autoprefixer = require('autoprefixer')
// const terserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, "js/app/index.js"),
    output: {
        path: path.join(__dirname, "../public"),
        filename: "js/index.js",
    },
    module: {
        rules: [{
            test: /\.less$/,
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            use: ["style-loader", "css-loader", "less-loader"]
            // }) //把 css 抽离出来生成一个文件
        }]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, "js/lib/jquery-2.0.3.min.js"),
            mod: path.join(__dirname, "js/mod"),
            less: path.join(__dirname, "less"),
        },
    },
    devtool:'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new miniCssPlugin({
        //     filename: 'css/style.css'
        // }),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: [
        //             autoprefixer(),
        //         ]
        //     }
        // })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};
