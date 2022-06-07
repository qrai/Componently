const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: { 
        main: "./src/dev/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "componently.[chunkhash].js",
    },
    devServer: {
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ 
                    'style-loader',
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                exclude: /node_modules/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                exclude: /node_modules/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/dev/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
    ]
};
