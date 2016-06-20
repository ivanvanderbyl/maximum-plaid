import Ember from 'ember';
import GroupElement from '../../mixins/group-element';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';

const {
  Component,
  run: { scheduleOnce }
} = Ember;

const AXIS_MAP = {
  top: axisTop,
  right: axisRight,
  bottom: axisBottom,
  left: axisLeft
};

export default Component.extend(GroupElement, {
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

  /**
   * The format used for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3/wiki/SVG-Axes#tickFormat)
   *
   * @public
   * @type {Function}
   */
  tickFormat: null,

  /**
   * The inner tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3/wiki/SVG-Axes#innerTickSize)
   *
   * @public
   * @type {Number}
   */
  tickSizeInner: 4,

  /**
   * The outer tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3/wiki/SVG-Axes#outerTickSize)
   *
   * @public
   * @type {Number}
   */
  tickSizeOuter: 8,

  xOffset: 0,

  yOffset: 0,

  didReceiveAttrs() {
    scheduleOnce('afterRender', this, this.drawAxis);
  },

  drawAxis() {
    let { y, x, xOffset, yOffset, scale, orientation, tickFormat, ticks, tickSizeInner, tickSizeOuter } =
      this.getProperties('y', 'x', 'xOffset', 'yOffset', 'scale', 'orientation', 'tickFormat', 'ticks', 'tickSizeInner', 'tickSizeOuter');

    let axis = this.createAxis(orientation, scale);

    axis.tickFormat(tickFormat);
    axis.tickSize(tickSizeInner, tickSizeOuter);
    axis.scale(scale);

    if (ticks) {
      axis.ticks(ticks);
    }

    this.selection.call(axis);
    this.selection.attr('transform', `translate(${x + xOffset}, ${y + yOffset})`);
  },

  createAxis(orient, scale) {
    return AXIS_MAP[orient](scale);
  }
});
