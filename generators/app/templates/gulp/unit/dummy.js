var gulp = require('gulp');

gulp.task('dummy', function(done) {
  console.log('this is a dummy task').then(done);
});