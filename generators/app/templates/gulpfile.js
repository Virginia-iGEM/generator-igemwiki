// Add additional modules up here
var path = require('path'); // Need path to to absolutify dirname

// Pass in local directory name, needed for configuration generation
// for igem-wikibrick. This same configuration file is made a global
// variable, so you can use it in your own gulp tasks.
global.wikibrick = require('./config')(path.resolve(__dirname));
// Require gulp from the igem-wikibrick module
// Pass in configuration
var gulp = require('igem-wikibrick/gulp-gulpfile')(global.wikibrick)
// TODO: Separate wikibrick gulpfile from generated gulpfile
//var gulp = require('./gulp/gulpfile')(global.wikibrick); // Uncomment for debugging in wikibrick

// If you would like to split your gulp tasks up into subfiles under the ./gulp directory, 
// first install gulp-hub with 
// npm i -D gulp-hub@next
// then uncomment these three lines
var HubRegistry = require('gulp-hub'); 
var hub = new HubRegistry(global.wikibrick.gulp.unit);
gulp.registry(hub);

// ----------------------- //
// WRITE CUSTOM TASKS HERE //
// ----------------------- //

// Just an example task
gulp.task('dummy', function(done) {
  console.log("Dummy task called");
  done();
});
