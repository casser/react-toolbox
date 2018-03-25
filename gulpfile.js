const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');

gulp.task('js', function () {
  return gulp.src([
    './components/**/*.js',
    '!./components/**/*.spec.js',
    '!./components/**/__test__',
    '!./components/__mocks__/**/*.js'
  ])
    .pipe(babel({
      "plugins": [
        ["transform-decorators-legacy","react-transform", {
          "transforms": [{
            "transform": "react-transform-hmr",
            "imports": ["react"],
            "locals": ["module"]
          }, {
            "transform": "react-transform-catch-errors",
            "imports": ["react", "redbox-react"]
          }]
        }]
      ]
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('css', function () {
  const plugins = [
    require('postcss-import')({
      root: __dirname,
      path: [path.join(__dirname, './components')]
    }),
    require('postcss-mixins')(),
    require('postcss-each')(),
    require('postcss-apply')(),
    require('postcss-nesting')(),
    require('postcss-reporter')({ clearMessages: true })
  ];

  return gulp.src([
      './components/*.css',
      './components/**/*.css'
    ])
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./lib'));
});

gulp.task('tsd', function () {
  gulp.src('./components/**/*.d.ts')
    .pipe(gulp.dest('./lib'));
});

gulp.task('default', ['js', 'css', 'tsd']);
