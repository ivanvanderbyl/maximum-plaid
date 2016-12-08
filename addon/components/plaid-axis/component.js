import Ember from 'ember';
import GroupElement from '../../mixins/group-element';
import { axisTop, axisRight, axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
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
  classNames: ['axis', 'Plaid-axis'],
  classNameBindings: ['orientation'],

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
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickFormat)
   *
   * @public
   * @type {Function}
   */
  tickFormat: null,

  /**
   * The inner tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickSizeInner)
   *
   * @public
   * @type {Number}
   */
  tickSizeInner: 4,

  /**
   * The outer tick size for the ticks for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickSizeOuter)
   *
   * @public
   * @type {Number}
   */
  tickSizeOuter: 8,

  /**
   * Explicit tick values for this axis.
   * [See D3 docs for more details](https://github.com/d3/d3-axis#axis_tickValues)
   *
   * @public
   * @type {Array}
   */
  tickValues: null,

  xOffset: 0,

  yOffset: 0,

  didReceiveAttrs() {
    scheduleOnce('render', this, this.drawAxis);
  },

  drawAxis() {
    let { y, x, xOffset, yOffset, scale, orientation, tickFormat, ticks, tickSizeInner, tickSizeOuter, tickValues }
      = this.getProperties('y', 'x', 'xOffset', 'yOffset', 'scale', 'orientation', 'tickFormat', 'ticks', 'tickSizeInner', 'tickSizeOuter', 'tickValues');

    let axis = this.createAxis(orientation, scale);

    axis.tickFormat(tickFormat);
    axis.tickSize(tickSizeInner, tickSizeOuter);
    axis.tickValues(tickValues);
    axis.scale(scale);

    if (ticks) {
      axis.ticks(ticks);
    }

    this.selection.transition(t).call(axis);
    let t = transition().duration(150);
    this.selection
      // .transition(t)
      .attr('transform', `translate(${x + xOffset}, ${y + yOffset})`);
  },

  createAxis(orient, scale) {
    return AXIS_MAP[orient](scale);
  }
});
