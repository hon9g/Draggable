const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        'js/index': [`${path.join(__dirname, 'src')}/index.js`],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx|ts|tsx)$/,
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
        new HtmlWebpackPlugin({ template: "./src/index.html" })
    ],
    stats: {
        children: true,
    },
    performance: {
        hints: false,
    }
};

module.exports = (_, argv) => {
    if (argv.mode === 'production') {
      config.output.publicPath = "/Draggable/";
    }

    return config;
  };
  