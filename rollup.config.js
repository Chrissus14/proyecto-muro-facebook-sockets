const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const filesize = require('rollup-plugin-filesize');
const progress = require('rollup-plugin-progress');

const builder = plugins =>
  rollup.rollup({
    input: 'src/client/main.js',
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**'
      }),
      terser()
    ].concat(plugins || [], progress({ clearLine: false }), filesize())
  });

builder().then(bundle => {
  bundle.write({
    format: 'umd',
    file: './dist/js/main.js',
    name: 'chat',
    sourcemap: false
  });
});
