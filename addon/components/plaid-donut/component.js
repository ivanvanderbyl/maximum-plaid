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
    let { piedValues, arc, colorScale } = getProperties(this, 'piedValues', 'arc', 'colorScale');

    let arcs = this.selection.selectAll('.arc path');

    if (piedValues !== this.drawnValues || piedValues.length !== this.drawnValues.length) {
      arcs = arcs.data(piedValues).enter()
        .append('g')
          .attr('class', 'arc')
          .append('path');
    }

    arcs
      .attr('fill', (d) => colorScale(d.index))
      .attr('d', arc);
  }
});

DonutComponent.reopenClass({
  positionalParams: [ 'values' ]
});

export default DonutComponent;
