import babel from 'rollup-plugin-babel';
import {uglify} from "rollup-plugin-uglify";
import typescript from '@rollup/plugin-typescript';

export default {
    input: [
        {'choosy.min': 'src/choosy.ts'},
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
        uglify(),
        babel({
            exclude: 'node_modules/**',
        }),
        typescript()
    ],
};