import babel from 'rollup-plugin-babel';
import {uglify} from "rollup-plugin-uglify";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/choosy.ts',
    onwarn(warning, rollupWarn) {
        if (warning.code !== 'CIRCULAR_DEPENDENCY') {
            rollupWarn(warning);
        }
    },
    output: {
        name: 'Choosy',
        file: 'dist/choosy.min.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        uglify(),
        babel({
            exclude: 'node_modules/**',
        }),
        typescript()
    ],
};