import { arc, pie } from  'd3-shape';
import Ember from 'ember';
import layout from './template';
import GroupElement from '../../mixins/group-element';
import { interpolate as d3Interpolate } from 'd3-interpolate';

function arcTween(a) {
  delete a.index;
  let i = d3Interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

const DonutComponent = Ember.Component.extend(GroupElement, {
  layout,

  innerRadius: 0,
  outerRadius: 200,

  pieFn() {
    return pie().padAngle(5 / 360);
  },

  arcFn() {
    return arc()
      .cornerRadius(8)
      .innerRadius(this.get('innerRadius'))
      .outerRadius(this.get('outerRadius'));
  },

  draw() {
    let values = this.get('values');
    let arcs = this.pieFn()(values);
    let arc = this.arcFn();
    let colorScale = this.get('colorScale');

    let plot = this.selection;

    let join = plot.selectAll('path').data(arcs);
    join.enter().append('path')
      .attr('fill', (d) => colorScale(d.index))
      .attr('d', arc)
      .each((d) => {
        this._current = d;
      });
    join.exit().select('path').remove();
    join.transition().duration(500).attrTween('d', arcTween);
  }
});

DonutComponent.reopenClass({
  positionalParams: ['values']
});

export default DonutComponent;
