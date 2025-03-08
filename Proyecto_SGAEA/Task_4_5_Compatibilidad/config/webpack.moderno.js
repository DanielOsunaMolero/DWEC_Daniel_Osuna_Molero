import path from 'path';
import { merge } from 'webpack-merge';  
import comun from './webpack.comun.js'; 

export default merge(comun, {
    output: {
        filename: 'bundle.moderno.js',
    },
});