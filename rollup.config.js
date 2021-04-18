import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import postcss from 'rollup-plugin-postcss';
import nested from 'postcss-nested';
import cssnano from 'cssnano';

const path = require('path');

export default {
    input: 'src/choosy.js',
    onwarn(warning, rollupWarn) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            rollupWarn(warning);
        }
    },
    output: {
        name: 'Choosy',
        file: 'dist/choosy.min.js',
        format: 'umd',
        sourcemap: 'inline',
    },
    plugins: [
        uglify(),
        babel({
            exclude: 'node_modules/**',
        }),
        postcss({
            plugins: [
                nested(),
                cssnano(),
            ],
            extensions: ['.css'],
            minimize: true,
            extract: path.resolve('dist/choosy.min.css')
        }),
    ],
};