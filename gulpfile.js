var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');
//var Server = require('karma').Server;
var mocha = require('gulp-mocha');
gulp.task('mocha', function () {
    return gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});

/**
 * Run test once and exit
 */
//gulp.task('test', function (done) {
//    new Server({
//        configFile: __dirname + '/karma.conf.js',
//        singleRun: true
//    }, done).start();
//});

gulp.task('less', function () {
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    gulp.src(['src/less/*.less', '!src/less/**/{reset,test,css3,z}.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['default']); //当所有less文件发生改变时，调用testLess任务
    gulp.watch('test/**/*.js', ['default']);
});
gulp.task('minifyjs', function () {
    return gulp.src('public/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});
gulp.task('default', ['less', 'watch', 'minifyjs','mocha']);