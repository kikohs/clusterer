import json from '@rollup/plugin-json';
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
        json(),
        resolve({
            browser: true,
            dedupe: ['gl-matrix'],
            mainFields: ['module', 'main'],
            preferBuiltins: false,
        }),
        commonjs({
            sourceMap: false,
            exclude: /(umap-js|skmeans)/,
        }),
        string({ include: /(umap-js|skmeans)/ }),
        terser()
    ],
 };
 
 export default config;
