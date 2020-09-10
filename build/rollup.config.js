import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import resolve from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import copy from 'rollup-plugin-copy'

import _postcss from 'postcss'

const postcssTrim = _postcss.plugin('postcss-trim', () => css => {
  css.raws.after = css.raws.after.replace(/^\n*$/g, '')
})

const globals = {
  'vue': 'Vue'
}

const componentName = 'FlowForm'

export default [
  {
    input: 'src/main.js',
    output: {
      name: componentName,
      exports: 'named',
      globals,
      format: 'umd',
      file: 'dist/vue-flow-form.umd.js'
    },
    plugins: [
      del({
        targets: 'dist/*'
      }),
      vue({
        css: false,
        compileTemplate: true
      }),
      postcss({
        output: 'css',
        extract: 'vue-flow-form.css',
        plugins: [
          postcssImport(),
          postcssTrim()
        ]
      }),
      css(),
      buble({
        objectAssign: 'Object.assign',
        jsx: 'h'
      }),
      commonjs(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.vue']
      }),
      del({
        targets: 'dist/vue-flow-form.umd.css',
        hook: 'writeBundle'
      })
    ]
  },
  {
    input: 'src/main.js',
    output: {
      name: componentName,
      exports: 'named',
      globals,
      format: 'es',
      file: 'dist/vue-flow-form.esm.js'
    },
    plugins: [
      vue({
        css: false,
        compileTemplate: true
      }),
      postcss({
        output: 'css',
        extract: 'vue-flow-form.css',
        plugins: [
          postcssImport(),
          postcssTrim()
        ]
      }),
      css(),
      buble({
        objectAssign: 'Object.assign',
        jsx: 'h'
      }),
      commonjs(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.vue']
      }),
      del({
        targets: 'dist/vue-flow-form.esm.css',
        hook: 'writeBundle'
      })
    ]
  },
  {
    input: 'src/main.js',
    output: {
      name: componentName,
      exports: 'named',
      globals,
      format: 'cjs',
      file: 'dist/vue-flow-form.common.js'
    },
    plugins: [
      vue({
        css: false,
        compileTemplate: true
      }),
      postcss({
        output: 'css',
        extract: 'vue-flow-form.css',
        plugins: [
          postcssImport(),
          postcssTrim()
        ]
      }),
      css(),
      buble({
        objectAssign: 'Object.assign',
        jsx: 'h'
      }),
      commonjs(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.vue']
      }),
      del({
        targets: 'dist/vue-flow-form.common.css',
        hook: 'writeBundle'
      })
    ]
  },
  {
    input: 'src/main.js',
    output: {
      name: componentName,
      exports: 'named',
      globals,
      format: 'umd',
      file: 'dist/vue-flow-form.umd.min.js'
    },
    plugins: [
      vue({
        css: false,
        compileTemplate: true
      }),
      postcss({
        output: 'css',
        extract: 'vue-flow-form.min.css',
        plugins: [
          postcssImport(),
          postcssTrim()
        ],
        sourceMap: true,
        minimize: true
      }),
      css(),
      buble({
        objectAssign: 'Object.assign',
        jsx: 'h'
      }),
      commonjs(),
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.vue']
      }),
      cleanup(),
      terser(),
      del({
        targets: 'dist/vue-flow-form.umd.min.css',
        hook: 'writeBundle'
      }),
      copy({
        targets: [
          {
            src: 'src/assets/css/themes/theme-minimal.css',
            dest: 'dist',
            rename: 'vue-flow-form.theme-minimal.css'
          },
          {
            src: 'src/assets/css/themes/theme-green.css',
            dest: 'dist',
            rename: 'vue-flow-form.theme-green.css'
          },
          {
            src: 'src/assets/css/themes/theme-purple.css',
            dest: 'dist',
            rename: 'vue-flow-form.theme-purple.css'
          }
        ]
      })
    ]
  }
]