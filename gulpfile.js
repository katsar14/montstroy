"use strict";

var gulp = require("gulp");
var del = require("del");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var server = require("browser-sync").create();
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var minify = require('gulp-csso');
var plumber = require("gulp-plumber");
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}"
    ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,webp,svg}")
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.svgo()
  ]))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("sprite", function () {
  return gulp.src("build/img/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/"));
});

gulp.task('html', function() {
  return gulp
    .src('source/**/*.html')
    .pipe(gulp.dest('build'))
});

gulp.task("vendor", function() {
  return gulp.src([
    "source/js/libs/**/*.js",
    "source/js/plugins/**/*.js"
  ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("js", function() {
  return gulp.src([
    "source/js/modules/*.js"
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"))
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/**/*.{png,jpg,svg}", gulp.series("images", "sprite", "refresh"));
  gulp.watch("source/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "vendor", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "vendor",
  "images",
  "sprite",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
