import gulp from 'gulp' // Основной модуль
import { path } from './gulp/config/path.js' // Импорт путей
import { plugins } from './gulp/config/plugins.js' // Импорт общих плагинов

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html_blue } from './gulp/tasks/html_blue.js'
import { html_green } from './gulp/tasks/html_green.js'
import { html_main } from './gulp/tasks/html_main.js'
import { html_white } from './gulp/tasks/html_white.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js'
import { svgSprive } from './gulp/tasks/svgSprive.js'

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy)
  gulp.watch(path.watch.html, html_green)
  gulp.watch(path.watch.html, html_blue)
  gulp.watch(path.watch.html, html_main)
  gulp.watch(path.watch.html, html_white)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
}

export { svgSprive }

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html_blue, html_green, html_main, html_white, scss, js, images))
// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

// Экспорт сценариев
export { dev }
export { build }

// Выполнение сценария по умолчанию
gulp.task('default', dev)