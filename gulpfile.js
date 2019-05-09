const gulp = require('gulp');
const ts = require('gulp-typescript').createProject('tsconfig.json');
const path = require('path');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');
const exec = require('child_process').exec;
const nodemon = require('gulp-nodemon');

const sourcePaths = [
    "./src/messages/**/*.ts"
];

const outputPaths = [
    "./messages"
]

gulp.task("clean", () => {
    return del("./messages")
});

gulp.task("tsc", (done) => {
    gulp.src(sourcePaths)
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(ts())
    .pipe(sourceMaps.write(".", {}))
    .pipe(gulp.dest(outputPaths));
    done();
});

gulp.task("copy", () => {
    return gulp.src("./src/messages/**/*.json")
    .pipe(gulp.dest("./messages"));
});

gulp.task("build", gulp.series(["clean", "tsc", "copy"]), (done) => {
    done();
});

gulp.task("serve", (done) => {
    const pckg = require('./package.json');
    nodemon({
        script: pckg.main,
        watch: ["./src/**/*.*"],
        ext: "ts",
        tasks: ['build']
    });
});