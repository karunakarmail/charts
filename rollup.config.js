import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

const config = {
  input: 'src/donut-chart/main.js',
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env']
    }),
    uglify()
  ],
  output: [
    { file: './dist/donut-chart.min.js', format: 'cjs' }
  ]
};

export default config;