import Ember from 'ember';
import GroupElement from '../../mixins/group-element';

const {
  assert,
  Component,
  getProperties,
  run: { scheduleOnce },
  typeOf
} = Ember;

const PlaidBarStackedComponent = Component.extend(GroupElement, {
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

  stackBy: null,
  colorScale: null,

  didReceiveAttrs() {
    this._super(...arguments);

    let orientation = this.get('orientation');

    assert(`bar chart orientation must be in {vertical,horizontal}, was "${orientation}"`,
      orientation === 'vertical' || orientation === 'horizontal');

    let checkScale = orientation === 'vertical' ? 'xScale' : 'yScale';

    assert(`${checkScale} must be a band-scale for ${orientation} bar charts`, typeOf(this.get(checkScale).bandwidth) === 'function');

    scheduleOnce('afterRender', this, this.drawBars);
  },

  drawBars() {
    let { values, xScale, yScale, stackBy, colorScale, orientation } =
      getProperties(this, 'values', 'xScale', 'yScale', 'stackBy', 'colorScale', 'orientation');

    let x, width, y, height;

    if (orientation === 'vertical') {
      x = (d) => xScale(d.data[stackBy]);
      width = xScale.bandwidth;
      y = (d) => yScale(d[1]);
      height = (d) => yScale(d[0]) - yScale(d[1]);
    } else {
      x = (d) => xScale(d[0]);
      width = (d) => xScale(d[1]) - xScale(d[0]);
      y = (d) => yScale(d.data[stackBy]);
      height = yScale.bandwidth;
    }

    this.selection.selectAll('.bar-group').data(values).enter().append('g')
      .attr('class', (d) => `bar-group ${d.key}`)
      .attr('fill', (d) => {
        if (colorScale) {
          return colorScale(d.key);
        }
      })
      .selectAll('.bar').data((d) => d).enter().append('rect')
        .attr('class', 'bar')
        .attr('x', x)
        .attr('width', width)
        .attr('y', y)
        .attr('height', height);
  }
});

PlaidBarStackedComponent.reopenClass({
  positionalParams: [ 'values' ]
});

export default PlaidBarStackedComponent;
