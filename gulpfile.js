const { src, dest, series, parallel } = require('gulp')
const rename = require('gulp-rename')
const mincss = require('gulp-minify-css')
const minhtml = require('gulp-minify-html')
const buffer = require('gulp-buffer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const bro = require('gulp-bro')
const babelify = require('babelify')

const config = require('./config')

const clean = ()=> console.log('删除上一次的东西')

const html = ()=> src(config.html.src)
  .pipe(minhtml())
  .pipe(dest(config.html.dist))

// 编译为node版
const nodeJavascript = ()=> src(config.js.src)
  .pipe(babel())
  .pipe(buffer())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(config.js.dist))

// 编译为浏览器版
const browerJavascript = ()=> src(config.js.src)
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ["@babel/env"] }),
      [ 'uglifyify', { global: true } ]
    ]
  }))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(config.js.dist))

const css = ()=> src(config.css.src)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) // 添加前缀(如：-webkit-)
  .pipe(concat('main.css')) // 合并为一个css
  .pipe(mincss())
  .pipe(rename({ extname: '.min.css' }))
  .pipe(dest(config.css.dist))

exports.default = series(
  // clean,
  parallel(
    html,
    browerJavascript,
    css
  ),
)