let gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    purge = require('gulp-css-purge'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger');

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('prod'));
});

gulp.task('style', function () {
    return gulp.src('src/scss/calendar.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCSS())
        .pipe(purge())
        .pipe(gulp.dest('prod/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('prod/js'));
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('prod/img'));
});

gulp.task('fonts:copy', async function () {
    gulp.src('src/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(gulp.dest('prod/fonts'));
});

gulp.task('build', gulp.series(['html', 'style', 'img', 'js', 'fonts:copy']));
