import Ember from 'ember';
import GroupElement from '../../mixins/group-element';
import { max, min } from 'd3-array';
import { path } from 'd3-path';
import { transition } from 'd3-transition';
import { easeBounceInOut } from 'd3-ease';

const {
  assert,
  Component,
  getProperties,
  run,
  typeOf
} = Ember;

const PlaidBarComponent = Component.extend(GroupElement, {
  layout: null,

  /**
   * Represents the bar orientation. May be "vertical" or "horizontal"
   *
   * @public
   * @type {String}
   */
  orientation: 'vertical',

  /**
    xScale function

    @public
    @type {D3 Scale}
  */
  xScale: null,

  /**
    yScale function

    @public
    @type {D3 Scale}
  */
  yScale: null,

  /**
    Values to render bars from. These should be the same as those used
    for the domains of the scaling functions.

    @public
    @type {Array}
  */
  values: [],

  fill: 'black',

  fillOpacity: 1.0,

  barConstructor: null,

  /**
   * Transition duration in ms
   *
   * @type {Number}
   * @public
   */
  duration: 125,

  didReceiveAttrs() {
    this._super(...arguments);

    let orientation = this.get('orientation');

    assert(`bar chart orientation must be in {vertical,horizontal}, was "${orientation}"`,
      orientation === 'vertical' || orientation === 'horizontal');

    let checkScale = orientation === 'vertical' ? 'xScale' : 'yScale';

    assert(`${checkScale} must be a band-scale for ${orientation} bar charts`, typeOf(this.get(checkScale).bandwidth) === 'function');

    run.scheduleOnce('afterRender', this, this.drawBars);
  },

  drawBars() {
    let { values, xScale, yScale, fill, fillOpacity, orientation }
      = getProperties(this, 'values', 'xScale', 'yScale', 'fill', 'fillOpacity', 'orientation');

    let x, width, y, height, pathData;

    let barConstructor = this.get('barConstructor');
    let duration = this.get('duration');

    if (orientation === 'vertical') {
      let maxHeight = max(yScale.range());
      x = (d) => xScale(d[0]);
      y = (d) => yScale(d[1]);
      width = () => xScale.bandwidth();
      height = (d) => maxHeight - yScale(d[1]);
    } else {
      x = () => min(xScale.range());
      y = (d) => yScale(d[1]);
      width = (d) => xScale(d[0]);
      height = () => yScale.bandwidth();
    }

    if (barConstructor) {
      pathData = barConstructor(x, y, width, height);
    } else {
      pathData = function(d) {
        let p = path();
        p.rect(x(d), y(d), width(d), height(d));
        return p;
      };
    }

    let t = transition().duration(duration).ease(easeBounceInOut);

    // UPDATE
    let bars = this.selection.selectAll('.bar').data(values);

    // EXIT
    bars.exit().remove();

    // ENTER
    // let enterJoin = bars.enter().append('rect');
    let enterJoin = bars.enter()
      .append('path')
      .attr('class', 'bar')
      .attr('d', pathData);

    // ENTER + UPDATE
    enterJoin.merge(bars)
      .on('click', (d, i) => run.next(this, this.handleBarClick, d, i))
      .on('mouseover', (d, index) => {
        run.next(this, this.handleBarHover, d, index);
      })
      .on('mouseout', () => {
        run.next(this, this.handleBarHover, null, null);
      })
      .transition(t)
      .attr('d', pathData)
    .attr('fill', fill)
    .attr('fillOpacity', fillOpacity);
  },

  handleBarClick(d, index) {
    this.sendAction('click', d, index);
  },

  handleBarHover(d, index) {
    this.sendAction('hover', d, index);
  }
});

PlaidBarComponent.reopenClass({
  positionalParams: ['values']
});

export default PlaidBarComponent;
