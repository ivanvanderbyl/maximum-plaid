/*jshint node:true*/
module.exports = {
  description: 'Installation blueprint for maximum plaid',
  normalizeEntityName: function () {},
  beforeInstall: function() {
    return this.addAddonsToProject({
      packages: [
        'ember-d3-shape@^0.8.5',
        'ember-math-helpers@^1.0.0'
      ]
    });
  }

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  // afterInstall: function(options) {
  //   // Perform extra work here.
  // }
};
