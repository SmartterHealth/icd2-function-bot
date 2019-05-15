const gulp = require('gulp');
const ts = require('gulp-typescript').createProject('tsconfig.json');
const sourceMaps = require('gulp-sourcemaps');
const del = require('del');
const nodemon = require('gulp-nodemon');

const sourcePaths = [
    "./src/messages/**/*.ts"
];

const outputPaths = [
    "./messages"
]

gulp.task("clean", (done) => {
    return del("./messages");
});

gulp.task("tsc", (done) => {
    gulp.src(sourcePaths)
    .pipe(sourceMaps.init({ loadMaps: true }))
    .pipe(ts())
    .pipe(sourceMaps.write(".", {}))
    .pipe(gulp.dest(outputPaths));
    done();
});

gulp.task("copy", (done) => {
    gulp.src("./src/messages/**/*.json")
    .pipe(gulp.dest("./messages"));
    done();
});

gulp.task("build", gulp.series(["clean", "tsc", "copy"]), (done) => {
    done();    
});

gulp.task("watch", (done) => {
    const packageJson = require('./package.json');
    return nodemon({
        script: packageJson.main,
        watch: ["./src/**/*.ts"],
        ext: "ts",
        tasks: ['build']
    });
});

gulp.task("serve", gulp.series(["build", "watch"]));
