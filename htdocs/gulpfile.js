/*
|--------------------------------------------------------------------------
| Gulp e Plugins
|--------------------------------------------------------------------------
*/

// Gulp

var gulp = require('gulp');

// Plugins

var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); 
var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var jshintStylish = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer'); 


/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/

var paths = {

    sass : [ 
            'assets_src/sass/**/*.scss',
            'assets_src/sass/style.scss'
           ],   
    js_lint : [ 
            'assets_src/js/**/*.js',
            '!assets_src/js/vendor/*.js'
           ],
    js :   [
             'assets_src/js/vendor/*.js' ,
             'assets_src/js/core/_nameSpace.js',
             'assets_src/js/core/_core.js',
             'assets_src/js/components/*.js',
             'assets_src/js/controller/*.js' 
            ]
}


 var compass_config = {

      css: 'assets/style',
      sass: 'assets_src/sass',
      image: 'assets/media',
      time: true

}

/*
|--------------------------------------------------------------------------
| Tarefas
|--------------------------------------------------------------------------
*/

// CLEAN

gulp.task('clean', function () {
  return gulp.src([
    'assets/style/style.css',
    'assets/script/main.js'
    ])
    .pipe(clean());
});


// CONCAT e MINIFICA

gulp.task('concat', function () {
    return gulp.src(paths.js)
               .pipe(plumber())
               .pipe(concat('main.js')) 
               .pipe(uglify()) 
               .pipe(gulp.dest('assets/script')) 
});
 
 // LINT

 gulp.task('lint', function() {
    return gulp.src(paths.js_lint)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish)); 
});



 // COMPASS

 gulp.task('compass', function() {
  return gulp.src(paths.sass)  
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass(compass_config)) 
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/style'));  
});
 

/*
|--------------------------------------------------------------------------
| Tarefas Gerais
|--------------------------------------------------------------------------
*/

gulp.task('watch', ['clean' ,'compass', 'lint', 'concat' ], function() {

  gulp.watch(paths.js, ['concat']);
  gulp.watch(paths.js_lint, ['lint']);  
  gulp.watch(paths.sass ,['compass']);  

}); 


gulp.task('default', ['watch']);  
