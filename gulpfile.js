var gulp = require('gulp');
var bump = require('gulp-bump');
var jade = require('gulp-jade');
var styl = require('gulp-stylus');
var coff = require('gulp-coffee');

gulp.task('stylus', function(){
  gulp.src('./src/css/*.styl')
  .pipe(styl())
  .pipe(gulp.dest('./app/css'));
});

gulp.task('bump', function(){
  gulp.src('./src/manifest.json')
  .pipe(bump())
  .pipe(gulp.dest('./app'))
  .pipe(gulp.dest('./src'));

  gulp.src(['./package.json'])
  .pipe(bump())
  .pipe(gulp.dest('./'));
});

gulp.task('jade', function(){
  gulp.src('./src/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./app'));
});

gulp.task('coffee', function(){
  gulp.src('./src/js/*.coffee')
  .pipe(coff())
  .pipe(gulp.dest('./app/js'));
});

gulp.task('copy', function(){
  gulp.src(['./src/*', '!./src/*.jade'])
  .pipe(gulp.dest('./app'));
  gulp.src('./src/js/vendor/*.js')
  .pipe(gulp.dest('./app/js/vendor'));
  gulp.src('./src/css/vendor/*.css')
  .pipe(gulp.dest('./app/css/vendor'));
  gulp.src(['./src/images/*', '!./src/images/*.xcf'])
  .pipe(gulp.dest('./app/images'));
  gulp.src(['./src/fonts/*'])
  .pipe(gulp.dest('./app/fonts'));
});

gulp.task('watch', function(){
  gulp.watch('./src/*.jade', function(){
    gulp.run('jade');
  });
  gulp.watch('./src/js/*.coffee', function(){
    gulp.run('coffee');
  });
  gulp.watch('./src/css/*.styl', function(){
    gulp.run('stylus');
  });
  gulp.watch(['./src/*', '!./src/*.jade'], function(){
    gulp.run('copy');
  });
});

gulp.task('default', ['stylus', 'jade', 'coffee', 'copy', 'watch']);

gulp.task('build', ['stylus', 'jade', 'coffee', 'copy']);