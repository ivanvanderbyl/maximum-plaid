import Ember from 'ember';
import GlobalResize from 'maximum-plaid/mixins/global-resize';

const {
  run: {
    throttle,
    next,
  },
  on
} = Ember;

export default Ember.Mixin.create(GlobalResize, {

  width: 1,
  height: 1,

  prepare: on('didInsertElement', function() {
    next(this, this.measureDimensions);
  }),

  didMeasureDimensions: Ember.K,

  didResize() {
    // window.requestAnimationFrame(this.measureDimensions.bind(this));
    throttle(this, this.measureDimensions, 100);
  },

  measureDimensions() {
    if (!this.element) { return; }

    const rect = this.element.getBoundingClientRect();
    this.setProperties({
      width: rect.width,
      height: rect.height,
    });

    this.trigger('didMeasureDimensions');
  },

});
