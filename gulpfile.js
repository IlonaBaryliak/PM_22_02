// Імпорти для необхідних плагінів
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

// Ініціалізація компілятора SCSS
const sassCompiler = gulpSass(sass);

// Таск для обробки HTML файлів
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

// Таск для обробки SCSS в CSS
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

// Таск для обробки JavaScript
gulp.task("scripts", function () {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("scripts.js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// Таск для оптимізації зображень
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

// Таск для копіювання Bootstrap
gulp.task("copy-bootstrap", function () {
  return gulp
    .src(["node_modules/bootstrap/dist/css/bootstrap.min.css"])
    .pipe(gulp.dest("dist/css")); // Зберігаємо CSS
});

// Таск для автоматичного копіювання JSON в dist
gulp.task("copy-json", function () {
  return gulp.src("app/data/**/*.json").pipe(gulp.dest("dist/data"));
});

// Таск для автоматичного перезавантаження сторінки
gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    port: 8080,
  });

  gulp
    .watch("app/data/**/*.json", gulp.series("copy-json"))
    .on("change", browserSync.reload);
  gulp.watch("app/js/**/*.js").on("change", browserSync.reload);
  gulp.watch("app/**/*.html").on("change", browserSync.reload);
  gulp.watch("app/scss/*.scss", gulp.series("scss"));
  gulp.watch("app/js/*.js", gulp.series("scripts"));
  gulp.watch("app/images/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});

// Таск за замовчуванням
gulp.task(
  "default",
  gulp.series(
    "html",
    "scss",
    "scripts",
    "imgs",
    "copy-bootstrap",
    "copy-json",
    "serve"
  )
);
