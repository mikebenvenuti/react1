//npm init   // to create package.json
//npm install --save gulp@3.9.0 gulp-connect@2.2.0 gulp-open@1.0.0
//npm install --save bootstrap@3.3.5 jquery@2.1.4 gulp-concat@2.6.0
//npm install --save gulp-eslint@0.15.0

//npm install --save react@0.13.3 react-router@0.13.3 flux@2.0.3


var gulp = require('gulp');
var connect = require('gulp-connect');  // runs a local dev server
var open = require('gulp-open');  // open url
var browserify = require('browserify');  // Bundle JS
var reactify = require('reactify');  // JSX to JS
var source = require('vinyl-source-stream');  // text streams with Gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');


var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        mainJs : './src/main.js',
        dist: './dist'
    }
}


gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true

    })
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});


gulp.task('html',  function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});


gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());

});

gulp.task('css',function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js ,['js','lint'])
})


gulp.task('default', ['html','js', 'css', 'lint', 'open', 'watch' ]);