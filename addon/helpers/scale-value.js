import Ember from 'ember';
const { assert } = Ember;

export function scaleValue([scale, ...args]) {
  assert('Scale must be a function', typeof scale === 'function');
  return scale(...args);
}

export default Ember.Helper.helper(scaleValue);
