//визначення нового завдання Gulp з ім'ям html
gulp.task("html", function () {
  return gulp
    .src("app/*.html")
    .pipe(gulp.dest("dist")) //копіює оптимізовані дані в діст
    .pipe(browserSync.stream()); //оновленння сторінки в браузері
});
// Таска для компіляції SCSS у CSS
gulp.task('scss', function () {
  return src("app/scss/*.scss") // Вибір файлів SCSS
    .pipe(sass()) // Компіляція SCSS у CSS
    .pipe(cssnano()) // Мінімізація CSS
    .pipe(rename({ suffix: ".min" })) // Додавання суфіксу .min до файлу
    .pipe(dest("dist/css")); // Збереження результату
});
gulp.task("scripts", function () {
  return gulp
    .src("app/js/*.js")
    .pipe(concat("scripts.js")) // об'єднує всі JS файли в один
    .pipe(uglify()) //стискання файлу для підвищення швидкості завантаження
    .pipe(rename({ suffix: ".min" })) // перейменовуєм шоб позначити мінімізовану версію
    .pipe(gulp.dest("dist/js")) //Копіює згенеровані JavaScript-файли до папки dist/js
    .pipe(browserSync.stream());
});

gulp.task("imgs", function () {
  return gulp
    .src("app/img/*.+(jpg|jpeg|png|gif|PNG)")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/imgs"));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });
  gulp
    .watch("app/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp.watch("app/js/*.js", gulp.series("scripts"));
  gulp
    .watch("app/scss/*.scss", gulp.series("scss"))
    .on("change", browserSync.reload);
  gulp.watch("app/img/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});
