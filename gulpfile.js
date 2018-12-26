var gulp = require('gulp');

//html代码压缩插件
var htmlClean = require("gulp-htmlclean");
//图片压缩插件
var imageMin = require("gulp-imagemin");
//js代码压缩插件
var uglify = require("gulp-uglify");
//删除js中的控制台和调试器语句插件
var debug = require("gulp-strip-debug");
//less转换css格式插件
var less = require("gulp-less");
//css压缩插件
var cleanCss = require("gulp-clean-css");
//css样式转换器
var postcss = require("gulp-postcss");
//css自动添加兼容性前缀插件
var autoprefixer = require("autoprefixer");
//本地模拟服务器插件
var connect = require("gulp-connect");

var folder = {
    src: "src/",
    dist: "dist/"
}
//判断当前为什么环境，生产环境才压缩，非生产环境不压缩
var devMod = process.env.NODE_ENV == "development";
gulp.task('html', function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})
gulp.task('images', function () {
    gulp.src(folder.src + "images/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "images/"))
})
gulp.task('css', function () {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]));
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + "css/"))
})
gulp.task('js', function () {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + "js/"))
})
gulp.task("server", function () {
    connect.server({
        port: "8888",
        livereload: true
    })
})
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
})
gulp.task('default', ["html", "css", "js", "images", "server", "watch"])