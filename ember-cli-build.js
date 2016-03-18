/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var excludeModules = !!process.env.EXCLUDE_D3_MODULES
  var app = new EmberAddon(defaults, {
    'ember-bootstrap': {
      'importBootstrapTheme': true
    },
    'ember-d3-scale': {
      'excludeModules': excludeModules
    }
  });

  if (excludeModules) {
    app.import('bower_components/d3/d3.js');
  }
  return app.toTree();
};
