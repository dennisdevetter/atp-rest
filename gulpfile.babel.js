var gulp = require('gulp')
var loadPlugins = require('gulp-load-plugins')
var del = require('del')
var path = require('path')
var babel = require('gulp-babel')
var mochaGlobals = require('./test/setup/.globals')
var manifest = require('./package.json')
var nodemon = require('gulp-nodemon')

// Load all of our Gulp plugins
const $ = loadPlugins()

// Gather the library data from `package.json`
const mainFile = manifest.main
const destinationFolder = path.dirname(mainFile)
const exportFileName = path.basename(mainFile, path.extname(mainFile))

function cleanDist(done) {
  del([destinationFolder]).then(() => done())
}

function onError() {
  $.util.beep()
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())    
    .on('error', onError)
}

function lintSrc() {
  return lint('src/**/*.js')
}

function lintTest() {
  return lint('src/**/__tests__/*.js')
}

function lintGulpfile() {
  return lint('gulpfile.babel.js')
}

function start(){  
  var path = './src/server.js'
    nodemon({
      exec: 'babel-node',
      presets: 'es2015',      
      ignore: ['node_modules/**/*.js'],
      script: path,
      ext: 'js',
      env: { 'NODE_ENV': 'development' },
      tasks: [] // perform these tasks before starting the server
    }).on('start', function(){  
        //          
    }).on('restart', function(){      
        // 
    })
}

function build() {
  return gulp.src(['src/**/*.js','!src/**/__tests__/*.js'])
    .pipe($.plumber())    
    .pipe(babel())    
    .pipe(gulp.dest(destinationFolder))   
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'src/**/__tests__/*.js'], {read: false})
    .pipe(babel())
    .pipe($.mocha({
      reporter: 'spec',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }))
}

function test() {
  return _mocha()
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc', '!node_modules/**/*.js']

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['test'])
}

// start the server in development mode
gulp.task('start', start)

// Remove the built files
gulp.task('clean', cleanDist)


// Lint our source code
gulp.task('lint-src', lintSrc)

// Lint our test code
gulp.task('lint-test', lintTest)

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile)

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile'])

// Build two versions of the library
gulp.task('build', ['lint', 'clean'], build)

// Lint and run our tests
gulp.task('test', ['lint'], test)

// Run the headless unit tests as you make changes.
gulp.task('watch', watch)

// An alias of test
gulp.task('default', ['test'])
