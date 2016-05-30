import Ember from 'ember';
import box from '../utils/box-expression';

const { computed } = Ember;

export default Ember.Mixin.create({

  /**
   * Specifies them margin for the main graph, such that you can position
   * guides (axis) outside of it.
   *
   * Accepts either an object specifying {top, right, bottom, left} in units,
   * or a CSS equivalent margin string without units.
   *
   * E.g. "24 10" == {top: 24, right: 10, bottom: 24, left: 10}
   *
   * @public
   * @type {String || Object}
   */
  margin: '0',

  /**
   * Computed dimensions for the actual plot.
   *
   * @public
   * @return {Object}
   */
  plotArea: computed('width', 'height', 'margin.[]', {
    get() {
      let height = this.getWithDefault('height', 0);
      let width = this.getWithDefault('width', 0);
      let margin = box(this.get('margin'));

      return {
        top: margin.top,
        left: margin.left,
        bottom: height - margin.top,
        right: width - margin.right,
        height: height - margin.top - margin.bottom,
        width: width - margin.left - margin.right,
        outerWidth: width,
        outerHeight: height
      };
    }
  })
});
