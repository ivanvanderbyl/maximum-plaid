import Ember from 'ember';
import layout from './template';

import computed from 'ember-computed';

export default Ember.Component.extend({
  layout,
  tagName: 'canvas',

  classNames: ['plaid-plot plaid-canvas'],

  attributeBindings: ['plotArea.outerWidth:width', 'plotArea.outerHeight:height'],

  xScale: null,

  yScale: null,

  canvasContext: null,

  didInsertElement() {
    Ember.run.next(this, function() {
      this.set('canvasContext', this.element.getContext('2d'));
    });
  }
});
