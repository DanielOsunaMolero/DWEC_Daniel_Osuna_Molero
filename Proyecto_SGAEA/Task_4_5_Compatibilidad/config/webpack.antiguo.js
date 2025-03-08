
import path from 'path';
import { merge } from 'webpack-merge'; 
import common from './webpack.comun.js'; 

export default merge(common, {// Se mezcla la configuración común con la configuración específica.
    output: {
        filename: 'bundle.antiguo.js', 
    },
    module: { 
        rules:  [
            {
                test: /\.js$/, 
                exclude: /node_modules/, // Excluir la carpeta node_modules.
                use: {
                    loader: 'babel-loader', 
                    options: {
                        presets: ['@babel/preset-env'],
                      },
                }
            },
        ],
    },
});