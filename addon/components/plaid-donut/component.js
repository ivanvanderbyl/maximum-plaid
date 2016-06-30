import { arc, pie } from  'd3-shape';
import Ember from 'ember';
import layout from './template';
import GroupElement from '../../mixins/group-element';
import { interpolateCool } from 'd3-scale';

const {
  Component,
  computed,
  get,
  getProperties,
  run,
  run: { scheduleOnce }
} = Ember;

const DonutComponent = Component.extend(GroupElement, {
  layout,

  radius: computed('width', 'height', function() {
    let { width, height } = getProperties(this, 'width', 'height');
    return Math.min(width, height) / 2;
  }),

  transform: computed('width', 'height', function() {
    let { width, height } = getProperties(this, 'width', 'height');

    return `translate(${width / 2},${height / 2})`;
  }),

  innerRadius: computed('radius', function() {
    return get(this, 'radius') - 32;
  }),

  outerRadius: computed('radius', function() {
    return get(this, 'radius');
  }),

  cornerRadius: 8,
  colorScale: interpolateCool,
  padDegrees: 5,

  drawnValues: [],

  didReceiveAttrs() {
    this._super(...arguments);

    scheduleOnce('afterRender', this, this.draw);
  },

  pie: computed('padDegrees', function() {
    return pie()
      .padAngle(get(this, 'padDegrees') / 360)
      .value((d) => d[1]);
  }),

  piedValues: computed('pie', 'values.[]', function() {
    let { values, pie } = getProperties(this, 'values', 'pie');

    return pie(values);
  }),

  arc: computed('cornerRadius', 'innerRadius', 'outerRadius', function() {
    let { cornerRadius, innerRadius, outerRadius } =
      getProperties(this, 'cornerRadius', 'innerRadius', 'outerRadius');

    return arc()
      .cornerRadius(cornerRadius)
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  }),

  draw() {
    let { piedValues: values, arc, colorScale } = getProperties(this, 'piedValues', 'arc', 'colorScale');
    let arcs = this.selection.selectAll('g.arc');
    let join = arcs.data(values);
    // DATA REMOVE
    join.exit().remove();

    // DATA ENTER
    let enterJoin = join.enter().append('g').attr('class', 'arc');
    enterJoin.append('path');

    // DATA MERGE + UPDATE
    enterJoin.merge(join)
      .attr('data-title', (d) => d.data[0])
      .select('path')
        .attr('d', arc)
        .attr('fill', (d) => colorScale(d.data[0]))
        .attr('stroke', (d) => colorScale(d.data[0]))
        .on('click', (d) => run(this, this.sendAction, 'on-click', d.data[0]))
        .on('mouseenter', (d) => run(this, this.sendAction, 'on-enter', d.data[0]))
        .on('mouseleave', (d) => run(this, this.sendAction, 'on-leave', d.data[0]));

  }
});

DonutComponent.reopenClass({
  positionalParams: [ 'values' ]
});

export default DonutComponent;
