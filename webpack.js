const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    output: {
        publicPath: '/',
        filename: 'dist/index.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './',
        inline: true,
        port: 8899,
        open: 'http://localhost:8899/',
        host: '0.0.0.0'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            }
        ]
    }
}
