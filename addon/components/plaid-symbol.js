import Ember from 'ember';

import {
  symbol,
  symbolCircle,
  symbolDiamond,
  symbolCross,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
} from 'd3-shape';

const {
  computed,
  assert,
  isPresent,
  typeOf
} = Ember;

/**
 * Generates the path data for a symbol as a <path> tag.
 *
 * @public
 * Usage:
 *
 *   {{plaid-symbol "TYPE" x y}}
 */

const SymbolComponent = Ember.Component.extend({
  tagName: 'path',
  attributeBindings: [
    'symbolData:d',
    'transform',
    'stroke',
    'fill',
    'strokeWidth:stroke-width'
  ],
  classNames: ['symbol'],
  classNameBindings: ['type'],

  /**
   * Symbol size in area
   *
   * @public
   * @type {Number}
   */
  size: 16,

  /**
   * Symbol to render
   *
   * Can either be a string or a symbol function.
   *
   * @public
   * @type {String}
   */
  type: 'diamond',

  /**
   * Fill color or style
   *
   * @public
   * @type {String}
   */
  fill: 'black',

  stroke: 'none',

  strokeWidth: 0,

  /**
   * Positioning offset from y
   *
   * @public
   * @type {Number}
   */
  y: 0,

  /**
   * Positioning offset from x
   *
   * @public
   * @type {Number}
   */
  x: 0,

  /**
   * Generates the SVG path data for the given symbol
   *
   * @public
   * @return {String}
   */
  symbolData: computed('size', 'type', {
    get() {
      let { size, type } = this.getProperties('size', 'type');
      let data;

      if (typeOf(type) !== 'string') {
        data = type;
      } else {
        data = {
          'circle': symbolCircle,
          'diamond': symbolDiamond,
          'cross': symbolCross,
          'square': symbolSquare,
          'star': symbolStar,
          'triangle': symbolTriangle,
          'wye': symbolWye
        }[type.toLowerCase()];
        assert(`Not a valid symbol type "${type}"`, isPresent(data));
      }

      let fn = symbol();
      fn.type(data);
      fn.size(size);

      return fn();
    }
  }),

  transform: computed('y', 'x', {
    get() {
      let { y, x } = this.getProperties('y', 'x');
      return `translate(${x},${y})`;
    }
  })
});

SymbolComponent.reopenClass({
  positionalParams: ['type', 'x', 'y']
});

export default SymbolComponent;
