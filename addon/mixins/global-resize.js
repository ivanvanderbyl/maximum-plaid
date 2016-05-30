import Ember from 'ember';

export default Ember.Mixin.create({
  _setupResizeListener: Ember.on('didInsertElement', function() {
    Ember.$(window).on(`resize.${this.elementId}`, (event) => {
      this.didResize(event);
    });
  }),

  _teardownResizeListener: Ember.on('willDestroyElement', function() {
    Ember.$(window).off(`resize.${this.elementId}`);
  }),

  didResize: Ember.K
});
