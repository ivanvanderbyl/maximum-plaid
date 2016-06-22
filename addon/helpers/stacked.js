import Ember from 'ember';
import { stack as d3Stack } from  'd3-shape';

const {
  assert,
  Helper: { helper },
  isArray
} = Ember;

export function stacked(params, hash) {
  assert('stacked requires at least 1 argument: data', params.length >= 1);

  let data = params[params.length - 1];
  assert('last argument must be an array of objects', isArray(data));

  let stack = d3Stack();

  if (params.length > 1) {
    // console.log('keys', params.slice(0, -1));
    stack.keys(params.slice(0, -1));
  }

  // valid hash keys are keys, value, order, offset
  for (let k in hash) {
    stack[k](hash[k]);
  }

  assert('keys must be provided as non-last params or as an option', stack.keys()().length > 0);

  return stack(data);
}

export default helper(stacked);
