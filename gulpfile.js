var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('build', function () {
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
            includePaths: ['scss'],
            onError: browserSync.notify
        })).on('error', handleError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('rebuild', ['build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'build'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(['src/layout/index.html'], ['rebuild']);
    gulp.watch(['src/style/*'], ['sass']);
});

gulp.task('default', ['browser-sync','watch']);
