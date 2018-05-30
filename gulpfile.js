const gulp = require('gulp');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const minifyhtml = require('gulp-minify-html');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const uglifycss =require('gulp-uglifycss');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

var src='public/src';
var dist='public/dist';

var paths={
  js: src+'/js/*.js',
  scss:src+'/scss/*.scss',
  html:src+'/**/*.html',
  mcss:dist+'/css/*.css'
}

//이렇게 객체화해두면 왕편함

 gulp.task('server',function(){
   return gulp.src(dist+'/')
    .pipe(webserver())
 });

 //image 압축
 gulp.task('imagemin',function(){
   return gulp.src(src+'/img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest(dist+'/img'))
 })

 gulp.task('combine-js',function(){
   return gulp.src(paths.js)
   .pipe(concat('all.js'))
  //  .pipe(uglify())
   .pipe(gulp.dest(dist+'/js'))
 });

 gulp.task('compile-sass',function(){
   return gulp.src(paths.scss)
   .pipe(sass())
  //  .pipe(uglifycss())
   .pipe(gulp.dest(dist+'/css'))
 });

 gulp.task('mincss',function(){
   return gulp.src(dist+'/css/*.css')
  .pipe(uglifycss())
  .pipe(gulp.dest(dist+'/com'))
 })

 gulp.task('compress-html',function(){
   return gulp.src(dist+'/css')
   .pipe(minifyhtml())
   .pipe(gulp.dest(dist+'/'))
 });

gulp.task('babel',function(){
  return gulp.src(paths.js)
  .pipe(babel())
  // .pipe(uglify())
  .pipe(gulp.dest(dist+'/js'))
});

// gulp.task('jscompress',function(){
//   return gulp.src(dist+'/js/*.js')
// .pipe(uglify())
// .pipe(gulp.dest(dist+'/com'))
// });

 gulp.task('watch',function(){
   livereload.listen();
  //  gulp.watch(paths.js,['combine-js']);
   gulp.watch(paths.js,['compile-sass']);
   gulp.watch(paths.js,['compress-html']);
   gulp.watch(paths.js,['babel']);
   gulp.watch(dist+'/**').on('change',livereload.changed);
 });


 gulp.task('default',['server','combine-js','compile-sass','compress-html','babel','mincss','imagemin']);