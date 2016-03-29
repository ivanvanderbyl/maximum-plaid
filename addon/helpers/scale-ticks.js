import Ember from 'ember';
const { assert } = Ember;

export function scaleTicks(params) {
  let scale = params.shift();
  assert('The ticks helper must take a scale with a `ticks` function', scale && typeof scale.ticks === 'function');
  return scale.ticks.apply(scale, params);
}

export default Ember.Helper.helper(scaleTicks);
