'use strict';

module.exports = {
  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'd3-scale', target: '^0.6.4' }
    ]);
  }
};
