import Ember from 'ember';
import GroupElement from '../../mixins/group-element';
import { select } from 'd3-selection';

const {
  Component,
  getProperties,
  run: { scheduleOnce }
} = Ember;

const PlaidBarComponent = Component.extend(GroupElement, {
  layout: null,

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

  didInsertElement() {
    this._super(...arguments);
    this.groupElement = select(this.element);
    scheduleOnce('afterRender', this, this.drawBars);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, this.drawBars);
  },

  drawBars() {
    let { values, xScale, yScale, fill, fillOpacity } =
      getProperties(this, 'values', 'xScale', 'yScale', 'fill', 'fillOpacity');

    let height = Math.max(...yScale.range());

    this.groupElement.selectAll('.bar').data(values).enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[0]))
      .attr('width', () => xScale.bandwidth())
      .attr('y', (d) => yScale(d[1]))
      .attr('height', (d) => height - yScale(d[1]))
      .attr('fill', fill)
      .attr('fillOpacity', fillOpacity);
  }
});

PlaidBarComponent.reopenClass({
  positionalParams: [ 'values' ]
});

export default PlaidBarComponent;
