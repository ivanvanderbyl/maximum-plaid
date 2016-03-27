import Ember from 'ember';
import { select } from 'd3-selection';

const { computed } = Ember;

/**
 * GroupElement mixin sets the component's tag to `<g>`, and assigns an instance
 * variable of `this.selection` to a D3 selection of itself.
 */

export default Ember.Mixin.create({
  tagName: 'g',

  x: 0,

  y: 0,

  attributeBindings: ['transform'],

  didInsertElement() {
    this.selection = select(this.element);
  },

  transform: computed('x', 'y', {
    get() {
      let { x, y } = this.getProperties('x', 'y');
      return `translate(${x},${y})`;
    }
  })
});
