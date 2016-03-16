import Ember from 'ember';
const { assert } = Ember;

export default function addOptionsToOrdinalScale(scale, hash) {
  if ('padding' in hash) {
    scale.padding(hash.padding);
  }

  if ('padding-inner' in hash) {
    assert('This scale does not support the `padding-inner` option', typeof scale.paddingInner === 'function');
    scale.paddingInner(hash['padding-inner']);
  }

  if ('padding-outer' in hash) {
    assert('This scale does not support the `padding-outer` option', typeof scale.paddingOuter === 'function');
    scale.paddingOuter(hash['padding-outer']);
  }

  if ('align' in hash) {
    scale.align(hash.align);
  }

  return scale;
}
