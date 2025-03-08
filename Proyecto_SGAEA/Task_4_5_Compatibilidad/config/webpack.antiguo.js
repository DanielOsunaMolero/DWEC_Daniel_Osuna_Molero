import path from 'path';
import { merge } from 'webpack-merge';
import common from './webpack.comun.js'; // ✅ Importar correctamente el archivo de configuración común

export default merge(common, {
    output: {
        filename: 'bundle.antiguo.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
});
