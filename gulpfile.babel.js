var gulp = require('gulp')
var loadPlugins = require('gulp-load-plugins')
var del = require('del')
var path = require('path')
var babel = require('gulp-babel')
var mochaGlobals = require('./test/setup/.globals')
var manifest = require('./package.json')
var nodemon = require('gulp-nodemon')
var env = require('gulp-env')

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
  return lint('src/**/__i?tests__/*.js')
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

function _mocha(testFiles) {
  return gulp.src(['test/setup/node.js', testFiles], {read: false})
    .pipe(babel())
    .pipe($.mocha({
      reporter: 'spec',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }))
}

function test() {
  return _mocha('src/**/__tests__/*.js')
}

function integrationtest() {
 return _mocha('src/**/__itests__/*.js') 
}

function set_env(stage) {
  return () => {
    var vars = {
      NODE_ENV: stage
    }

    if (stage == 'integrationtest') {
        vars['MONGO_URI'] = 'mongodb://localhost:27017/integrationtest'
    }

    env({ vars })  
  }  
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc', '!node_modules/**/*.js']

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['test'])
}

function watch_integrationtests() {
  gulp.watch(watchFiles, ['integrationtest'])
}

// start the server in development mode
gulp.task('start', ['set-env-development'], start)

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
gulp.task('test', ['lint', 'set-env-test'], test)

// Lint and run our tests
gulp.task('integrationtest', ['lint', 'set-env-integrationtest'], integrationtest)

// Run the headless unit tests as you make changes.
gulp.task('watch', watch)

// runs the integration tests as you make changes.
gulp.task('watch-integration', watch_integrationtests)

// An alias of test
gulp.task('default', ['test'])

// set environments
gulp.task('set-env-development', set_env('development'))
gulp.task('set-env-test', set_env('unittest'))
gulp.task('set-env-integrationtest', set_env('integrationtest'))
