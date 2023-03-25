import fileinclude from "gulp-file-include"
import webpHtml from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import htmlMin from 'gulp-htmlmin'

export const html_blue = () => {
  return app.gulp.src([
      'src/pages/edo.html',
          'src/pages/press-service.html',
          'src/pages/purchases.html',
          'src/pages/contacts.html',
          'src/pages/request-speeches.html',
          'src/pages/fleet-processing.html',
          'src/pages/request-pass.html',
          'src/pages/container-trains.html',
          'src/pages/port-client.html',
          'src/pages/port-services.html',
          'src/pages/vacancies.html',
          'src/pages/educational-center.html',
          'src/pages/students.html',
          'src/pages/404.html',
          'src/pages/career.html',
          'src/pages/about.html',
          'src/pages/search.html',
          'src/pages/dangerous-goods.html'
      ])
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.wrap({src: 'src/layouts/default.html'}))
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