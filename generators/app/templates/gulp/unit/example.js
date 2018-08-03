var gulp = require('gulp');

gulp.task('example', function(done) {
  console.log('this is an example task').then(done);
});