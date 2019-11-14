const { src, dest, series, parallel } = require('gulp')

const rename = require('gulp-rename'),
  mincss = require('gulp-minify-css'),
  minhtml = require('gulp-minify-html'),
  buffer = require('gulp-buffer'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  bro = require('gulp-bro'),
  babelify = require('babelify'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  del = require('del')

require('dotenv').config()
const { nodeJavascript, browerJavascript, image, html, css } = process.env

const config = require('./config')

const clean = ()=> del(['dist/css/*.css', 'dist/js/*.js', 'dist/html/*.html', 'dist/images/*.jpg', 'dist/images/*.png'])

// 压缩图片
const taskImage = ()=> src(config.images.src)
  .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
  .pipe(dest(config.images.dist))

const taskHtml = ()=> src(config.html.src)
  .pipe(minhtml())
  .pipe(dest(config.html.dist))

// 编译为node版
const taskNodeJavascript = ()=> src(config.js.src)
  .pipe(babel())
  .pipe(buffer())
  .pipe(uglify())
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(config.js.dist))

// 编译为浏览器版
const taskBrowerJavascript = ()=> src(config.js.src)
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ["@babel/env"] }),
      [ 'uglifyify', { global: true } ]
    ]
  }))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(dest(config.js.dist))
  
// css
const taskCss = ()=> src(config.css.src)
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) // 添加前缀(如：-webkit-)
  .pipe(concat('main.css')) // 合并为一个css
  .pipe(mincss())
  .pipe(rename({ extname: '.min.css' }))
  .pipe(dest(config.css.dist))

const Alltask = []
Number(nodeJavascript) && Alltask.push(taskNodeJavascript)
Number(browerJavascript) && Alltask.push(taskBrowerJavascript)
Number(image) && Alltask.push(taskImage)
Number(html) && Alltask.push(taskHtml)
Number(css) && Alltask.push(taskCss)

exports.default = series(
  clean,
  parallel(...Alltask)
)