import layout from '../templates/components/plaid-plot';
import Coordinates from 'maximum-plaid/mixins/coordinates';
import Component from 'ember-component';

let PlotComponent = Component.extend(Coordinates, {
  layout,

  tagName: 'svg',

  classNames: ['plaid-plot'],

  attributeBindings: ['plotArea.outerWidth:width', 'plotArea.outerHeight:height'],

  /**
   * Represents the xScale, if used.
   *
   * @public
   * @type {D3 Scale}
   */
  xScale: null,

  /**
   * Represents the yScale, if used.
   *
   * @public
   * @type {D3 Scale}
   */
  yScale: null

  /**
   * Represents the coordinates to render the main graphic.
   *
   * This is typically the output of the Coordinates mixin:
   *
   * {top, right, bottom, left, width, height, outerWidth, outerHeight}
   *
   * @public
   * @type {Object}
   */
  //  plotArea: {}

});

PlotComponent.reopenClass({
  positionalParams: ['xScale', 'yScale', 'plotArea']
});

export default PlotComponent;
