var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('cp', function () {
    return gulp.src('src/layout/index.html')
        .pipe(gulp.dest('dist'));
});

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function () {
    return gulp.src('src/style/main.scss')
        .pipe(sass({
            includePaths: ['scss']
        })).on('error', handleError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/style'));
});

gulp.task('watch', function () {
    gulp.watch(['src/layout/index.html'], ['cp']);
    gulp.watch(['src/style/*'], ['sass']);
});

gulp.task('default', ['cp', 'sass', 'watch']);
