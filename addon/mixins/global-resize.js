import Ember from 'ember';

const { Mixin, on, $, K, run } = Ember;

export default Mixin.create({
  _setupResizeListener: on('didInsertElement', function() {
    $(window).on(`resize.${this.elementId}`, (event) => {
      run.next(this, this.didResize, event);
    });
  }),

  _teardownResizeListener: on('willDestroyElement', function() {
    $(window).off(`resize.${this.elementId}`);
  }),

  didResize: K
});
