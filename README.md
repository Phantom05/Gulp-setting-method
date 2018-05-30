# Gulp
## gulp 사용법

```javascript
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var babel = require('gulp-babel');
var uglifycss =require('gulp-uglifycss');
var concat = require('gulp-concat');

var src='public/src';
var dist='public/dist';

var paths={
  js: src+'/js/*.js',
  scss:src+'/scss/*.scss',
  html:src+'/**/*.html'
}
```
//이렇게 객체화해두면 왕편함

//task의 두번째는 선행되야할 것임. 없으면 걍 바로실행됨
```javascript
gulp.task('combine-js',[lint-js],function(){
  return gulp.src('./public/js/**/*.js')//js폴더안의 모든 js파일을 가져옴 /**/ 이건 와일드카드로 모두를 뜻함
  //만약 포함하고 싶지 않은게 있다면 ! 느낌표를 붙이면됨 '!public/src/js/slider/slider-beta.js' 이런식
  //특정 폴더내에서 모두가져오고싶다면 public/src/js/slider/*.js 이런식이면 됨
  .pipe(concat('all.js'))//pipe를 사용해서 task의 결과물을 function에 전달해줄수 있다.
  .pipe(gulp.desk('public/dist/js'));
})
```
/*
이렇게있으면 우선 src를 모두 글고 아래 piping을 한다는것다. 

저 파일들에게 저 pipe기능을 모두 사용하겠다는 뜼!
```javascript
gulp.src('public/src/js/*.js')
	.pipe(stripDebug()) // 모든 alert과 console.log를 제거해준다.
	.pipe(uglify()) //모든 js파일을 어글리파이 하겠다는건대 js를 압축해준다.
	.pipe(concat('script.js')) // js파일들에게 script.js를 붙이겠다는 뜻
  .pipe(gulp.dest('public/dist/js')); 
  // 마지막으로 이파일들을 이 폴더로 보냄, 이를 통해 우리가 실제로 사용하게 될 output파일로 쓰여짐 
```

```javascript
gulp.task('default',['combine-js']);
```
//command-line 에서 아무런 아규먼트없이 실행될때 실행되는 task,

//만약 특정 task를 실행하고싶다면 gulp=task-name을 사용하면됨

```
gulp-webserver 웹서버처럼 동작하게 하는 플러그인
gulp-concat js 파일 병합 플러그인
gulp-uglify js파일 압축을 위한 플러그인
gulp-minify-html -html파일 minify를 위한 플러그인
gulp-sass sass 파일을 컴파일하기 위한 플러그인
gulp-livereload 웹 브라우저를 리로드하기 위한 플러그인
```
```javascript
// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(uglifycss())
		.pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

//기본 task 설정
gulp.task('default', [
	'server', 'combine-js', 
	'compile-sass', 'compress-html', 
	'watch' ])

 ```

 gulp.watch(folder,[actoions])

 gulp.watch에게 특정 folder를 바라보게하고, 어떤 actions을 재시작하게 한다.

 scss파일을 수정 후 저장했을때 js파일의 minify를 다시 수 행할 필요는 없기 때문에 

 각각 경우에 따른 gulp watch를 설정해야한다.
 
 위의 기능을 사용하기 위해선 liverload Chrome plugin이 필요하다

 gulp실행 후에 extention 아이콘을 눌러야한다.