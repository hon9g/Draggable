const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'js/index': [`${path.join(__dirname, 'src')}/index.js`],
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: "/",
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./dist/index.html" })
    ],
    stats: {
        children: true,
    }
};
