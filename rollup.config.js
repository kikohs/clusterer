import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; 

 const config = {
   input: 'src/index.js',
   output: {
     file: 'dist/clusterer.js',
     format: 'iife',
     name: 'Clusterer',
   },

    plugins: [commonjs(), resolve(), terser()],
 };
 
 export default config;
