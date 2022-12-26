import babel from 'rollup-plugin-babel';
import {uglify} from "rollup-plugin-uglify";
import postcss from 'rollup-plugin-postcss';
import nested from 'postcss-nested';
import postcss_import from 'postcss-import'
import cssnano from 'cssnano';
import multiInput from 'rollup-plugin-multi-input';
import typescript from '@rollup/plugin-typescript';

const path = require('path');

export default {
    input: [
        {'choosy.min': 'src/choosy.ts'},
        {'global.choosy.min': 'src/globalChoosy.ts'}
    ],
    onwarn(warning, rollupWarn) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            rollupWarn(warning);
        }
    },
    output: {
        name: 'Choosy',
        dir: 'dist',
        format: 'esm',
        sourcemap: 'inline',
    },
    plugins: [
        typescript(),
        uglify(),
        multiInput(),

        babel({
            exclude: 'node_modules/**',
        }),

        postcss({
            plugins: [
                nested(),
                postcss_import(),
                cssnano(),
            ],
            extensions: ['.css'],
            minimize: true,
            extract: path.resolve('dist/choosy.min.css')
        }),

    ],
};