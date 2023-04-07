import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; 
import { string } from 'rollup-plugin-string';

 const config = {
   input: 'src/index.js',
   output: {
     file: 'dist/clusterer.js',
     format: 'iife',
     name: 'Clusterer',
   },

    plugins: [
        resolve(), commonjs(),
        string({ include: /(umap-js|skmeans)/ }),
        terser(),
    ],
 };
 
 export default config;
