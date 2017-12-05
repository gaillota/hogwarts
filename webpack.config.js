const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const externals = {}

fs.readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => externals[mod] = 'commonjs ' + mod)

// Dev config
module.exports = {
    devtool: 'eval-source-map',
    entry: path.join(__dirname, 'src/index.js'),
    target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
    externals,
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            mangle: true,
        }),
    ],
}
