const { src, dest, series, parallel } = require('gulp')
const rename = require('gulp-rename')
const mincss = require('gulp-minify-css')
const minhtml = require('gulp-minify-html')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const config = require('./config')

function clean() {
  // 删除上一次的东西
}

function html() {
  return src(config.html.src)
    .pipe(minhtml())
    .pipe(dest(config.html.dist))
}

function javascript() {
  return src(config.js.src)
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(config.js.dist))
}

function css() {
  return src(config.css.src)
    .pipe(mincss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(config.css.dist))
}

exports.default = series(
  // clean,
  parallel(
    html,
    javascript,
    css
  ),
)