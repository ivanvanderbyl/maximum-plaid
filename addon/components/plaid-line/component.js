import Ember from 'ember';
import layout from './template';
import GroupElement from '../../mixins/group-element';
import { line, curveMonotoneX } from 'd3-shape';

const {
  computed,
  isPresent,
  String: { dasherize, w },
} = Ember;

const PlaidLineComponent = Ember.Component.extend(GroupElement, {
  layout,

  canvas: null,

  // tagName: '',

  // tagName: computed('canvas', {
  //   get() {
  //     if (this.get('canvas')) {
  //       return '';
  //     }else{
  //       return 'g';
  //     }
  //   }
  // }),

  /**
   * xScale function
   *
   * @type {D3 Scale}
   */
  xScale: null,

  /**
   * yScale function
   *
   * @type {D3 Scale}
   */
  yScale: null,

  /**
   * Values to render line from. These should be the same as those used
   * for the domains of the scaling functions.
   *
   * @type {Array}
   */
  values: [],

  stroke: "black",
  strokeWidth: 2,
  strokeOpacity: 1.0,

  fill: 'none',
  fillOpacity: null,

  curve: curveMonotoneX,

  didRender() {
    const pathAttrs = this.getProperties(w('stroke strokeWidth strokeOpacity fill fillOpacity'));
    const line = this.selection.select('path.line');

    this.get('pathData');

    Object.keys(pathAttrs).forEach((attr) => {
      let value = pathAttrs[attr];

      if (isPresent(value)) {
        line.attr(dasherize(attr), value);
      }
    });
  },

  pathData: computed('values.[]', 'xScale', 'yScale', 'canvas', {
    get() {
      const { values, xScale, yScale, curve, } =
        this.getProperties('values', 'xScale', 'yScale', 'curve');

      const context = this.get('canvas');

      const lineFn = line()
        .curve(curve)
        .x((d) => xScale(d.timestamp))
        .y((d) => yScale(d.value));

      if (!!context) {
        lineFn.context(context);
        context.clearRect(0, 0, 720, 240);

        context.globalAlpha = 1;
        context.beginPath();
        lineFn(values);
        context.lineWidth = 1;
        context.strokeStyle = "#000";
        context.stroke();
      }else{
        return lineFn(values);
      }
    },
  }),
});

PlaidLineComponent.reopenClass({
  positionalParams: ['values'],
});

export default PlaidLineComponent;
