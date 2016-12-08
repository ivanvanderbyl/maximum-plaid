import Ember from 'ember';
import Component from 'ember-component';
import layout from './template';
import GroupElement from '../../mixins/group-element';
import { line, curveMonotoneX } from 'd3-shape';
import { transition } from 'd3-transition';

const {
  run,
  get, set,
  computed,
  isPresent,
  String: { dasherize, w }
} = Ember;

const PlaidLineComponent = Component.extend(GroupElement, {
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

  stroke: 'black',
  strokeWidth: 2,
  strokeOpacity: 1.0,

  fill: 'none',
  fillOpacity: null,

  curve: curveMonotoneX,

  didReceiveAttrs() {
    run.scheduleOnce('render', this, this.redraw);
  },

  redraw() {
    let pathAttrs = this.getProperties(w('stroke strokeWidth strokeOpacity fill fillOpacity'));
    let line = this.selection.select('path.line');
    Object.keys(pathAttrs).forEach((attr) => {
      let value = pathAttrs[attr];

      if (isPresent(value)) {
        line.attr(dasherize(attr), value);
      }
    });

    let pathData = get(this, 'pathData');
    let t = transition().duration(150);

    line.transition(t).attr('d', pathData);
  },

  pathData: computed('values.[]', 'xScale', 'yScale', 'curve', {
    get() {
      let { values, xScale, yScale, curve }
        = this.getProperties('values', 'xScale', 'yScale', 'curve');

      let lineFn = line()
        .curve(curve)
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      if (curve) {
        lineFn.curve(curve);
      }

      return lineFn(values);
    }
  })
});

PlaidLineComponent.reopenClass({
  positionalParams: ['values']
});

export default PlaidLineComponent;
