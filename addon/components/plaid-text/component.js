import Ember from 'ember';
import layout from './template';

const {
  computed,
  Component,
  getProperties
} = Ember;

const PlaidTextComponent = Component.extend({
  tagName: 'text',
  layout,
  classNames: ['plaid-text'],
  attributeBindings: ['transform', 'fill', 'dx', 'dy', 'rotate', 'textLength', 'lengthAdjust', 'textAnchor:text-anchor'],

  textAnchor: 'middle',

  x: 0,
  y: 0,
  fill: '#000',

  dx: null,
  dy: null,
  rotate: null,
  textLength: null,
  lengthAdjust: null,

  value: null,
  textRotate: 0,

  transform: computed('x', 'y', 'textRotate', {
    get() {
      let { x, y, textRotate } = getProperties(this, 'x', 'y', 'textRotate');
      return `translate(${x},${y}) rotate(${textRotate})`;
    }
  })
});

PlaidTextComponent.reopenClass({
  positionalParams: ['value']
});

export default PlaidTextComponent;
