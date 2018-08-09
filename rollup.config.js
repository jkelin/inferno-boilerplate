import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import tsc from 'typescript';
import alias from 'rollup-plugin-alias';
import path from 'path';
import closure from 'rollup-plugin-closure-compiler-js';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss'
import sourcemaps from 'rollup-plugin-sourcemaps';
import livereload from 'rollup-plugin-livereload';

const prod = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.tsx',
  output: {
    file: 'dist/main.js',
    sourcemap: true,
    format: 'cjs'
  },
  plugins: [
    postcss({
      extract: true,
      minimize: prod,
      sourceMap: true,
      plugins: []
    }),
    alias({
      inferno: prod ? path.resolve(__dirname, 'node_modules/inferno/index.esm.js') : path.resolve(__dirname, 'node_modules/inferno/dist/index.dev.esm.js'),
      'react-redux': path.resolve(__dirname, 'node_modules/inferno-redux/dist/index.esm.js'),
      // 'redux-form': path.resolve(__dirname, 'node_modules/redux-form/dist/redux-form.js'),
      'react': path.resolve(__dirname, 'node_modules/inferno-compat/dist/index.esm.js'),
			'react-dom': path.resolve(__dirname, 'node_modules/inferno-compat/dist/index.esm.js')
    }),
    resolve(),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      sourceMaps: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    prod && uglify(),
    // prod && closure()
    process.env.ROLLUP_WATCH && serve({
      contentBase: ['dist', 'static'],
      historyApiFallback: true,
      port: 3000
    }),
    process.env.ROLLUP_WATCH && livereload(),
    sourcemaps(),
  ].filter(Boolean)
};
