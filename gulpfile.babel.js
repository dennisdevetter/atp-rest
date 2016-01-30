import gulp  from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import del  from 'del';
import glob  from 'glob';
import path  from 'path';
import source  from 'vinyl-source-stream';
import babel from 'gulp-babel';
import mochaGlobals from './test/setup/.globals';
import manifest  from './package.json';
import { Instrumenter } from 'isparta';
import nodemon from 'gulp-nodemon';
import notify from 'gulp-notify';

// Load all of our Gulp plugins
const $ = loadPlugins();

// Gather the library data from `package.json`
const config = manifest.babelBoilerplateOptions;
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile, path.extname(mainFile));

function cleanDist(done) {
  del([destinationFolder]).then(() => done());
}

function cleanCoverage(done){
 del(['coverage']).then(() => done()); 
}

function onError() {
  $.util.beep();
}

// Lint a set of files
function lint(files) {
  return gulp.src(files)
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())    
    .on('error', onError);
}

function lintSrc() {
  return lint('src/**/*.js');
}

function lintTest() {
  return lint('test/**/*.js');
}

function lintGulpfile() {
  return lint('gulpfile.babel.js');
}

function start(){  
  var path = './src/server.js';
    nodemon({
      exec: 'babel-node',
      presets: 'es2015',
      script: path,
      ext: 'js',
      env: { 'NODE_ENV': 'development' },
      tasks: [] // perform these tasks before starting the server
    }).on('start', function(){      
      notify('nodemon started.');
    }).on('restart', function(){
      console.log('restarted');      
    });
}

function build() {
  return gulp.src('src/**/*.js')
    .pipe($.plumber())    
    .pipe(babel())    
    .pipe(gulp.dest(destinationFolder));   
}

function _mocha() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js'], {read: false})
    .pipe(babel())
    .pipe($.mocha({
      reporter: 'spec',
      globals: Object.keys(mochaGlobals.globals),
      ignoreLeaks: false
    }));
}

function test() {
  return _mocha();
}

function coverage(done) {  
  gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe($.istanbul({ 
      instrumenter: Instrumenter,
      includeUntested: true }))
    .pipe($.istanbul.hookRequire())    
    .on('finish', () => {
      return test()
        .pipe($.istanbul.writeReports({
           dir: './coverage',
           reporters: [ 'lcov' ],
           reportOpts: { dir: './coverage'}
        }))
        .pipe($.istanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', done);
    });
}

const watchFiles = ['src/**/*', 'test/**/*', 'package.json', '**/.eslintrc', '.jscsrc'];

// Run the headless unit tests as you make changes.
function watch() {
  gulp.watch(watchFiles, ['test']);
}

// start the server in development mode
gulp.task('start', start);

// Remove the built files
gulp.task('clean', cleanDist);

// Remove coverage folder
gulp.task('clean-coverage', cleanCoverage);

// Lint our source code
gulp.task('lint-src', lintSrc);

// Lint our test code
gulp.task('lint-test', lintTest);

// Lint this file
gulp.task('lint-gulpfile', lintGulpfile);

// Lint everything
gulp.task('lint', ['lint-src', 'lint-test', 'lint-gulpfile']);

// Build two versions of the library
gulp.task('build', ['lint', 'clean'], build);

// Lint and run our tests
gulp.task('test', ['lint'], test);

// Set up coverage and run tests
gulp.task('coverage', ['lint', 'clean-coverage'], coverage);

// Run the headless unit tests as you make changes.
gulp.task('watch', watch);

// An alias of test
gulp.task('default', ['test']);
