import Ember from 'ember';
import { select } from 'd3-selection';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';

// const { run: { scheduleOnce }} = Ember;

export default Ember.Component.extend({
  tagName: 'g',

  y: 0,

  x: 0,

  ticks: 3,

  /**
   * Represents the axis orientation. You should always declare this.
   *
   * @type {String}
   */
  orientation: 'top',

  /**
   * A scaling function used for this axis.
   *
   * @type {Function}
   */
  scale: null,

  tickFormat: null,

  xOffset: 0,

  yOffset: 8,

  didInsertElement() {
    this._super();
    this.groupElement = select(this.element);

    // const orientation = this.get('orientation');
    // const scale = this.get('scale');

    // this.axis = this.createAxis(orientation, scale);

    this.drawAxis();
  },

  didRender() {
    this.drawAxis();
  },

  drawAxis() {
    const { y, x, xOffset, yOffset } = this.getProperties('y', 'x', 'xOffset', 'yOffset');
    const scale = this.get('scale');
    const orientation = this.get('orientation');
    const tickFormat = this.get('tickFormat');

    this.axis = this.createAxis(orientation, scale);
    this.groupElement.call(this.axis);

    this.axis.tickFormat(tickFormat);

    // this.axis.ticks(this.get('ticks'));
    this.axis.tickSizeOuter(32);
    this.axis.tickSizeInner(16);
    this.axis.scale(scale);
    this.groupElement.attr('transform', `translate(${x + xOffset}, ${y + yOffset})`);
  },

  createAxis(orient, scale) {
    return {
      top: axisTop(scale),
      right: axisRight(scale),
      bottom: axisBottom(scale),
      left: axisLeft(scale),
    }[orient];
  },
});
