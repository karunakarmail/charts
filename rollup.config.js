import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const bundle1 = {
  input: './donut-chart.js',
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      runtimeHelpers: true
    }),
    uglify()
  ],
  output: [
    { file: './dist/donut-chart.min.js', format: 'cjs' }
  ]
};

const bundle2 = {
  input: './bar-chart.js',
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      runtimeHelpers: true
    }),
    uglify()
  ],
  output: [
    { file: './dist/bar-chart.min.js', format: 'cjs' }
  ]
};


export default [
  Object.assign({},bundle1, bundle2),
]