const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './client/index.js',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js',
    },

    plugins: [
        new HTMLWebpackPlugin({
            title: 'Development',
            template: './public/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // {
            //     test: /.(css|scss)$/,
            //     // exclude: /node_modules/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
              },
        ],
    },
    target: "web",
    devServer: {
        host: 'localhost',
        port: '8080',
        open: true,
        hot: true,
        liveReload: true,
        static: {
            publicPath: '/public',
            directory: path.resolve(__dirname, 'public')
        },

        // whatever route we want different pages to goto
        // backend
        proxy: {
            '/': 'http://localhost:3000', 
        },
    }, 
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

}