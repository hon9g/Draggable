const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
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
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
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
  