import Ember from 'ember';
import { select } from 'd3-selection';
import GroupElement from '../../mixins/group-element';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';

const { run: { scheduleOnce } } = Ember;

export default Ember.Component.extend(GroupElement, {
  layout: null,
  classNames: [ 'axis', 'Plaid-axis' ],
  classNameBindings: [ 'orientation' ],

  y: 0,

  x: 0,

  ticks: 3,

  /**
   * Represents the axis orientation. You should always declare this.
   *
   * @public
   * @type {String}
   */
  orientation: 'top',

  /**
   * A scaling function used for this axis.
   *
   * @public
   * @type {Function}
   */
  scale: null,

  tickFormat: null,

  xOffset: 0,

  yOffset: 0,

  didInsertElement() {
    this._super();
    this.groupElement = select(this.element);
    scheduleOnce('afterRender', this, this.drawAxis);
  },

  didReceiveAttrs() {
    scheduleOnce('afterRender', this, this.drawAxis);
  },

  drawAxis() {
    let { y, x, xOffset, yOffset } = this.getProperties('y', 'x', 'xOffset', 'yOffset');
    let scale = this.get('scale');
    let orientation = this.get('orientation');
    let tickFormat = this.get('tickFormat');
    let ticks = this.get('ticks');

    let axis = this.createAxis(orientation, scale);

    axis.tickFormat(tickFormat);
    axis.tickSizeOuter(8);
    axis.tickSizeInner(4);
    axis.scale(scale);

    if (ticks) {
      axis.ticks(ticks);
    }

    this.groupElement.call(axis);
    this.groupElement.attr('transform', `translate(${x + xOffset}, ${y + yOffset})`);
  },

  createAxis(orient, scale) {
    return {
      top: axisTop(scale),
      right: axisRight(scale),
      bottom: axisBottom(scale),
      left: axisLeft(scale)
    }[orient];
  }
});
