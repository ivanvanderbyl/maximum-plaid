/* jshint node: true */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-d3-scale',
  npmDependencies: [
    'd3-array',
    'd3-collection',
    'd3-color',
    'd3-format',
    'd3-interpolate',
    'd3-time',
    'd3-time-format',
    'd3-scale'
  ],
  included: function(app, opts) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var config = this.app.options || {};
    var addonConfig = config[this.name] || {};
    var vendor = this.treePaths.vendor;

    if (!addonConfig.excludeModules) {
      this.npmDependencies.forEach(function(dependency) {
        app.import(vendor + '/' + dependency + '/' + dependency + '.js');
      });
    }
  },
  treeForVendor: function(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    this.npmDependencies.forEach(function(dependency) {
      trees.push(treeForDependency(dependency));
    });

    return mergeTrees(trees);
  }
};

function treeForDependency(dependency) {
  var depPath = path.dirname(require.resolve(dependency));
  return new Funnel(depPath, {
    destDir: dependency,
    include: [new RegExp(/\.js$/)]
  });
}
