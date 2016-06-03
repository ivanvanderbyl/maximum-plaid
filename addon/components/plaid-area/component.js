import Ember from 'ember';
import layout from './template';
import { area } from 'd3-shape';
import GroupElement from '../../mixins/group-element';
import computed from 'ember-computed';

const {
  isPresent,
  String: { dasherize, w }
} = Ember;

const AreaComponent = Ember.Component.extend(GroupElement, {
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

  fillOpacity: 1.0,

  didRender() {
    let pathAttrs = this.getProperties(w('fill fillOpacity'));
    let area = this.selection.select('path.area');
    Object.keys(pathAttrs).forEach((attr) => {
      let value = pathAttrs[attr];

      if (isPresent(value)) {
        area.attr(dasherize(attr), value);
      }
    });
  },

  pathData: computed('values.[]', 'xScale', 'yScale', 'curve', {
    get() {
      let { values, xScale, yScale, curve } =
        this.getProperties('values', 'xScale', 'yScale', 'curve');

      let areaFn = area()
        .x((d) => xScale(d[0]))
        .y1((d) => yScale(d[1]))
        .y0(yScale(0));

      if (curve) {
        areaFn.curve(curve);
      }

      return areaFn(values);
    }
  })
});

AreaComponent.reopenClass({
  positionalParams: ['values']
});

export default AreaComponent;
