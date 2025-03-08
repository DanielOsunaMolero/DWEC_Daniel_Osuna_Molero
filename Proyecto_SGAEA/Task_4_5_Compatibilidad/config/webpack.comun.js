import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';


export default {
  entry: './js/main.js',
  output: {
    path: path.resolve(process.cwd(), 'compilado', process.env.modo),// Se define la carpeta de salida.
    filename: 'bundle.js',
  },
  mode: process.env.modo,

  plugins: [// Se añade el plugin de copia de archivos.
    new CopyWebpackPlugin({
        patterns: [
            { from: './index.html', to: '.' }, 
        ],
    }),
],
}