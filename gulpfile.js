import gulp from "gulp";
import cssnano from "gulp-cssnano";
import autoprefixer from "gulp-autoprefixer";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import fileInclude from "gulp-file-include";

const sassCompiler = gulpSass(sass);
gulp.task("html", function () {
  return gulp
    .src("app/html/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("scss", function () {
  return gulp
    .src("app/scss/*.scss")
    .pipe(sassCompiler().on("error", sassCompiler.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("imgs", function () {
  return gulp
    .src("app/images/*.+(jpg|jpeg|png|gif)", { encoding: false })
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
  gulp
    .watch("app/html/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp.watch("app/js/*.js", gulp.series("scripts"));
  gulp.watch("app/scss/*.scss", gulp.series("scss"));
  gulp.watch("app/img/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});
gulp.task("copy-bootstrap", function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    ])
    .pipe(gulp.dest("dist/css")); // Зберігаємо CSS
});
gulp.task(
  "default",
  gulp.series("html", "scss", "scripts", "imgs", "copy-bootstrap", "watch")
);
gulp.task("bootstrap", function () {
  return gulp
    .src(
      [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
      ],
      { base: "node_modules/bootstrap/dist" }
    ) // базовий шлях для коректного збереження в dist
    .pipe(gulp.dest("dist")); // Копіювання у dist
});
