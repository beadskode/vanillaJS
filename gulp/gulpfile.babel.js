import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";

const routes = {
    pug: {
        src: "src/*.pug",
        // src: "src/**/*.pug"
        dest: "build"
    }
}

const pug = () => {
    return gulp.src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest))
    // 화살표함수 대괄호 작성 시 return 이 있어야 함
}

const clean = () => del(["build"]);

const prepare = gulp.series([clean])

const assets = gulp.series([pug])

export const dev = gulp.series([prepare, assets])