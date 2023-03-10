import fileinclude from "gulp-file-include"
import webpHtml from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import htmlMin from 'gulp-htmlmin'

export const html_blue_wrapper = () => {
  return app.gulp.src([
      'src/pages/edo.html',
          'src/pages/service-template.html'
      ])
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.wrap({src: 'src/layouts/default-wrapper.html'}))
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'images/'))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ],
      },
      'output': {
        'file': 'gulp/version.json'
      },
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}