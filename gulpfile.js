var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  gulp.watch('app/templates/*.hbs', function() {
    console.log('running: `npm run build-template`');
    exec("npm run build-templates");
  });
});
