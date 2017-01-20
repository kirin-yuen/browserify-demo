var browserify = require('browserify'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');

gulp.task('js', function() {
    return browserify('./src/main.js', {
            debug: true /* include source map if not uglify */
        })
        .bundle()
        /**
         * browserify base on stream
         * gulp doesn't understand browserify bundle directly
         * so use the vinvl source stream to translate browserify's output
         * into something that gulp understands (Vinyl Object File's stream)
         */
        .pipe(source('bundle.js'))
        /**
         * uglify expects a full file (Vinyl Object File's buffer) before it can do its job
         */
        .pipe(buffer())
        .pipe(uglify())
        /* streamify it takes a stream been transformed set into a buffer */
        // .pipe(streamify(uglify()))
        .pipe(gulp.dest('.'));
});
