var gulp = require('gulp')
var fs = require('fs')
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var useref = require('gulp-useref');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var uglify =  require('gulp-uglify');

var filesToMove = [
    './src/css/style.css',
    './src/css/sprites.css',
    './src/bower_components/**/*.*',
    './src/img/**/*.*',
    './src/**/*.pdf'
];

gulp.task('move',function(){
    // the base option sets the relative root for the set of files,
    // preserving the folder structure
    return gulp.src(filesToMove, { base: './src' })
        .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
    return gulp.src('./src/components/**/*.tmpl.html')
        .pipe(templateCache({module: 'Ahlgren', root: '/components'}))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('minify', function () {

    var assets = useref.assets();
    return gulp.src(['./src/index.html', './src/js/templates.js'])
        .pipe(assets)// this is the destination concat.js file
        .pipe(gulpif('*.js', uglify({mangle:false})))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});

var wiredep = require('wiredep').stream;

gulp.task('bower', function () {
    return gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./src'));
});

gulp.task('inject-src', function(){
    var entry = gulp.src('src/*.html');
    var sources = gulp.src([
        '!./src/bower_components/**/*.*',
        'src/**/*.js',
        'src/**/*.css'
    ], {read: false});
    return entry.pipe(inject(sources, {relative:true}))
        .pipe(gulp.dest('src'))
})

gulp.task('inject', ['inject-src', 'bower']);
gulp.task('build', ['templates', 'inject', 'minify', 'move']);

gulp.task('start', function(){
    connect.server({ port: 1337, root: 'src' });
})

gulp.task('start-prod', function(){
    connect.server({ port: 1337, root: 'dist' });
})

console.log('The bundle path',process.env.AHLGREN_SSL_BUNDLE_PATH);

gulp.task('start-prod-ssl', function(){
    connect.server({ port: 443, root: 'dist', https: {
        ca: fs.readFileSync(process.env.AHLGREN_SSL_BUNDLE_PATH),
        key: fs.readFileSync(process.env.AHLGREN_SSL_KEY_PATH),
        crt: fs.readFileSync(process.env.AHLGREN_SSL_CERT_PATH)
    }});
})

gulp.task('sass', shell.task(["sass --watch src/css:src/css  -r 'compass/import-once/activate' --style compressed"]));

gulp.task('dev', ['start', 'sass'] );