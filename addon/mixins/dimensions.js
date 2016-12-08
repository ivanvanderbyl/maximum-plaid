import Ember from 'ember';
import GlobalResize from 'maximum-plaid/mixins/global-resize';

const {
  Mixin,
  K,
  run: {
    throttle,
    next
  },
  on,
  get
} = Ember;

export default Mixin.create(GlobalResize, {
  width: 1,
  height: 1,

  _prepareToCalculateFirstDimensions: on('didInsertElement', function() {
    next(this, this.measureDimensions);
  }),

  /**
   * Fires after each resize calculation, ensuring we have valid dimensions.
   *
   * @public
   * @type {Function}
   */
  didMeasureDimensions: K,

  /**
   * Configures the throttling on calcuting the resize.
   *
   * Defaults to once every frame 40ms.
   *
   * @type {Number}
   * @public
   */
  resizeThrottle: 1e3 / 25,

  didResize() {
    let resizeThrottle = get(this, 'resizeThrottle');
    throttle(this, this.measureDimensions, resizeThrottle);
  },

  /**
   * Calculates dimensions of this container. This forces the browser to calculate
   * styles, which is slow, so don't do this too often or you'll create jank.
   *
   * @public
   */
  measureDimensions() {
    if (!this.element) {
      return;
    }

    let { minWidth, minHeight } = this.getProperties('minWidth', 'minHeight');

    let rect = this.element.getBoundingClientRect();
    this.setProperties({
      width: Math.max(rect.width, minWidth),
      height: Math.max(rect.height, minHeight)
    });

    this.trigger('didMeasureDimensions');
  }

});
