import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const config = {
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

export default config;