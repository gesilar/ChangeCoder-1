const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const rimraf = require("gulp-rimraf");
const gulpSequence = require("gulp-sequence");
const concat = require("gulp-concat");
const rev = require("gulp-rev");
const revCollector = require('gulp-rev-collector');

const isDevelopment = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "development" ? true : false;

gulp.task("clean", () => {
    return gulp.src([
        "./public/scripts/"
    ], { read:false })
        .pipe(rimraf({force: true}));
});

gulp.task("vendor", () => {
    return gulp.src([
            `./public/vendors/scripts/react${isDevelopment ? "" : ".min"}.js`,
            `./public/vendors/scripts/react-dom${isDevelopment ? "" : ".min"}.js`,
            "./public/vendors/scripts/react-redux.min.js",
            "./public/vendors/scripts/redux.min.js"
        ])
        .pipe(concat("vendor.js"))
        .pipe(rev())
        .pipe(gulp.dest("./public/scripts/"))
        .pipe(rev.manifest())
        .pipe(gulp.dest("./public/scripts/"));
});

gulp.task("rev", function(){
    return gulp.src(["./public/**/*.json", "./src/templates/index.html"])
    .pipe(revCollector({replaceReved: true}))
    .pipe(gulp.dest("./views/"));
});

gulp.task("default", gulpSequence("clean", "vendor", "rev"));