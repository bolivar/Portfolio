//////////////////////////////////////////////////////
// Required
//////////////////////////////////////////////////////
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
    autoprefixer = require('gulp-autoprefixer');
    sass = require('gulp-ruby-sass');

// fix problems with undefined Promise class
// http://stackoverflow.com/questions/32490328/gulp-autoprefixer-throwing-referenceerror-promise-is-not-defined
require('es6-promise').polyfill();

var config = {
     sassPath: 'scss',
     bowerDir: 'bower_components' 
}


//////////////////////////////////////////////////////
// Sass Task
//////////////////////////////////////////////////////
gulp.task('css', function(){
  return sass(config.sassPath + '/style.sass', {
             style: 'compressed',
         }).on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             })) 
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('css'))
  .pipe(reload({stream:true}));
});


//////////////////////////////////////////////////////
// HTML Task
//////////////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src('*.html')
  .pipe(reload({stream:true}));
});

//////////////////////////////////////////////////////
// BrowserSync Task
//////////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: "../portfolio"
    }
  })
});


//////////////////////////////////////////////////////
// Watch Task
//////////////////////////////////////////////////////
gulp.task('watch', function(){
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/**/*.sass', ['css']);
  gulp.watch('*.html', ['html']);
});


//////////////////////////////////////////////////////
// Default Task
//////////////////////////////////////////////////////
gulp.task('default', ['css', 'html', 'browser-sync', 'watch']);
