# Gulp
## gulp 사용법

반복잡업을 피하기 위한 빌드 도구이다.
```javascript
npm install -g gulp
//해당 파일로 이동 후
npm install --save-dev gulp

gulpfile.js 생성
```
```javascript
//유용한 plugin
gulp-webserver                # (웹서버처럼 동작하게 하는 플러그인)
gulp-concat                   # (js 파일 병합 플러그인)
gulp-uglify                   # (js파일 압축을 위한 플러그인)
gulp-minify-html              # (html파일 minify를 위한 플러그인)
gulp-sass                     # (sass 파일을 컴파일하기 위한 플러그인)
gulp-livereload               # (웹 브라우저를 리로드하기 위한 플러그인)
gulp-babel                    # (babel을 사용하기 위한 플러그인)
gulp-imagemin                 # (image 압축을 위한 플러그인)
gulp-uglifycss                # (css min파일을 위한 플러그인)
```
이렇게 사용하고 해도 되고 추가해서 사용해도 된다.
```javascript
//file tree
node_modules                  # (node_bodules)
public                        # (기본 트리구조)
├─dist                        # (컴파일 된 파일이 저장될 위치 폴더)
│ ├─com/                      # (컴파일 된 css를 min파일로 compress할 폴더)
│ ├─css/                      # (컴파일 된 css 파일)
│ ├─img/                      # (압축된 이미지가 저장될 곳)
│ ├─js/                       # (babel로인해 트렌스파일 된 js가 저장될 폴더)
│ └─index.html                # (compress된 html이 저장됨)
├─lib                         # (그대의 라이브버리 폴더)
│ └─etc..                     # (그대의 라이브러리)
└─src                         # (작업할 폴더)
  ├─img/                      # (작성할 img폴더)
  ├─js/                       # (작성할 js 폴더)
  ├─scss/                     # (작성할 scss 폴더)
  └─index.html                # (작성할 html 파일)
.gitignore                    # (push를 무시할 파일 설정 파일)
.babelrc                      # (babel을 사용할 의존성 파일) 
gulpfile.js                   # (gulp를 사용하기 위한 의존성 파일)
package.json                  # (npm 사용 package파일. gulp를 사용할 때 중요)
package-lock.json             # (npm 사용 package파일. gulp를 사용할 때 중요)
		
```
```javascript
//gulpfile.js
//#1
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

//#2
const src='public/src';
const dist='public/dist';

const paths={
  js: src+'/js/*.js',
  scss:src+'/scss/*.scss',
  html:src+'/**/*.html',
  mcss:dist+'/css/*.css'
}
//객체화해서 넣어두면 아주 편하다.
```
>#1 

require로 설치한 npm모듈 gulp plugin을 변수에 넣어둔다.

중요한 점은 gulp를 사용할떄 반드시 --save-dev를 이용하여 설치해야한다.

약어는 -D 이다 (ex.$ npm i gulp-uglify -D)

gulp는 package.json 안에 반드시 선언되어 있어야 사용이 가능하다.

--save-dev를 사용하지않고 그냥 npm install babel 해버리면 package.json에 종종 들어가지 않는 경우가있다.


>#2 

plugin을 많이 사용해서 gulp나 webpack을 사용하기 때문에 자주사용하는 경로를 변수에 넣어둔다.

```javascript
//#3
gulp.task('combine-js',[lint-js],function(){
  return gulp.src('./public/js/**/*.js')
  .pipe(concat('all.js'))
  //pipe를 사용해서 task의 결과물을 function에 전달해줄수 있다.
  .pipe(gulp.desk('public/dist/js'));
  //desk 즉, 해당 경로로 컴파일 한 파일을 만들어 주겠다는것이다.
})
```
>#3

js폴더안의 모든 js파일을 가져옴 /**/ 이건 와일드카드로 '모두'를 뜻한다.

task의 두번째[]는 선행되야할 것임. 없으면 그냥 바로 함수가 실행됨

만약 포함하고 싶지 않은게 있다면 ! 느낌표를 붙이면됨 '!public/src/js/slider/slider-beta.js' 이런식

특정 폴더내에서 모두가져오고싶다면 public/src/js/slider/*.js 이런식이면 됨

이렇게있으면 우선 src를 모두 글고 아래 piping을 한다는것다. 

저 파일들에게 저 pipe기능을 모두 사용하겠다는 뜼!

#3번의 예제는 예시이기 때문에 같이 코딩하지 않는다.

```javascript
//#4
gulp.src('public/src/js/*.js')
  .pipe(stripDebug()) 
  .pipe(uglify()) 
  .pipe(concat('script.js')) 
  .pipe(gulp.dest('public/dist/js')); 
  // 마지막으로 이파일들을 이 폴더로 보냄, 이를 통해 우리가 실제로 사용하게 될 output파일로 쓰여짐 
```
>#4


gulp.src 뒤에 주소있는 파일을 모두 긁어온다.

그런 다음 아래로 차례로 실행되게 된다.

.pipe(stripDebug())

/*모든 alert과 console.log를 제거해준다.

/*.pipe(uglify()) //모든 js파일을 어글리파이 하겠다는건대 js를 압축해준다.

.pipe(concat('script.js'))

/*모든 js 파일을 script.js를 만들어 붙이겠다는 뜻

.pipe(gulp.dest('public/dist/js'));

/*마지막으로 이파일들을 이 폴더로 보냄, 이를 통해 우리가 실제로 사용하게 될 output파일로 쓰여짐 


```javascript
//#5
gulp.task('default',['combine-js']);
// -> 실행시 gulp 만 입력하면 defualt 안의 내용들이 실행된다.
```
>#5

command-line 에서 아무런 아규먼트없이 실행될때 실행되는 task

만약 특정 task를 실행하고싶다면 gulp task-name을 사용하면된다.


```javascript
//#6

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
  return gulp.src(dist + '/')
    .pipe(webserver());
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
  return gulp.src(paths.js)
    .pipe(concat('script.js'))
    //.pipe(uglify()) *실행이 안됨.
    .pipe(gulp.dest(dist + '/js'));
});

 //image 압축
 gulp.task('image-min',function(){
   return gulp.src(src+'/img/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest(dist+'/img'))
 });

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(uglifycss())
    .pipe(gulp.dest(dist + '/css'));
});

//com 파일에 css로 컴파일된 css를 min파일로 컴파일한다.
 gulp.task('mincss',function(){
   return gulp.src(dist+'/css/*.css')
  .pipe(uglifycss())
  .pipe(gulp.dest(dist+'/com'))
 })

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
  return gulp.src(paths.html)
    .pipe(minifyhtml())
    .pipe(gulp.dest(dist + '/'));
});

// es6파일을 es5로 컴파일한다.
gulp.task('babel',function(){
  return gulp.src(paths.js)
  .pipe(babel())
  // .pipe(uglify())
  .pipe(gulp.dest(dist+'/js'))
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
 gulp.task('default',['server','combine-js','compile-sass','compress-html','babel','mincss','image-min']);
 ```
>#6


 gulp.watch(folder,[actoions])

 gulp.watch에게 특정 folder를 바라보게하고, 어떤 actions을 재시작하게 한다.

 scss파일을 수정 후 저장했을때 js파일의 minify를 다시 수 행할 필요는 없기 때문에

 각각 경우에 따른 gulp watch를 설정해야한다.
 
 위의 기능을 사용하기 위해선 liverload Chrome plugin이 필요하다

 gulp실행 후에 extention 아이콘을 눌러야한다.