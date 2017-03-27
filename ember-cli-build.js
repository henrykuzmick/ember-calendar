/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: "sass"
    }
  });
  app.import('bower_components/bootstrap/dist/css/bootstrap.css')
  app.import('bower_components/moment/min/moment.min.js')
  app.import('bower_components/jt.timepicker/jquery.timepicker.css')
  app.import('bower_components/jt.timepicker/jquery.timepicker.js')
  return app.toTree();
};
