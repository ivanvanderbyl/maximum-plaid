import Ember from 'ember';
import Component from 'ember-component';
import layout from './template';
import { area } from 'd3-shape';
import GroupElement from '../../mixins/group-element';
import computed from 'ember-computed';
import { transition } from 'd3-transition';

const {
  run,
  get,
  isPresent,
  String: { dasherize, w }
} = Ember;

const AreaComponent = Component.extend(GroupElement, {
  layout,

  /**
   * xScale function
   *
   * @public
   * @type {D3 Scale}
   */
  xScale: null,

  /**
   * yScale function
   *
   * @public
   * @type {D3 Scale}
   */
  yScale: null,

  /**
   * Values to render line from. These should be the same as those used
   * for the domains of the scaling functions.
   *
   * @public
   * @type {Array}
   */
  values: [],

  fill: 'black',

  pathFn: null,

  fillOpacity: 1.0,

  didReceiveAttrs() {
    run.scheduleOnce('render', this, this.redraw);
  },

  redraw() {
    let pathAttrs = this.getProperties(w('fill fillOpacity'));
    let area = this.selection.select('path.area');
    Object.keys(pathAttrs).forEach((attr) => {
      let value = pathAttrs[attr];

      if (isPresent(value)) {
        area.attr(dasherize(attr), value);
      }
    });

    let pathData = get(this, 'pathData');
    let t = transition().duration(150);

    area.transition(t).attr('d', pathData);
  },

  pathData: computed('values.[]', 'xScale', 'yScale', 'curve', {
    get() {
      let { values, xScale, yScale, curve, pathFn }
        = this.getProperties('values', 'xScale', 'yScale', 'curve', 'pathFn');

      if (pathFn) {
        this.selection.selectAll('path')
          .data(values)
        .enter().append('path')
          .attr('d', (d) => `M${ d.join('L') }Z`);
      } else {
        let areaFn = area();

        if (xScale && yScale) {
          areaFn.x((d) => xScale(d[0]))
            .y1((d) => yScale(d[1]))
            .y0(yScale(0));
        }

        if (curve) {
          areaFn.curve(curve);
        }

        return areaFn(values);
      }

    }
  })
});

AreaComponent.reopenClass({
  positionalParams: ['values']
});

export default AreaComponent;
