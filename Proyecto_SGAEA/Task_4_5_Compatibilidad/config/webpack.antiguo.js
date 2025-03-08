const path = require('path');
const { merge } = require('webpack-merge'); 
const common = require('./webpack.comun.js'); 

module.exports = merge(common, {
    output: {
        filename: 'bundle.antiguo.js', 
    },
    module: { 
        rules:  [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: [['@babel/preset-env', { targets: "> 0.25%, not dead, ie 11", useBuiltIns: "entry", corejs: 3 }]],
                    },
                }
            },
        ],
    },
});
