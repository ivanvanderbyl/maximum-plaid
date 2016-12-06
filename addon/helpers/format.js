import Ember from 'ember';
import { format as d3Format } from 'd3-format';
const { Helper } = Ember;

export function format([value], hash) {
  hash = Object.assign({}, hash);

  let result;
  if (!hash.format) {
    hash.format = ',';
  }

  if (value < 1 && hash.ignoreSmallValues) {
    result = '< 1';
  } else {
    result = d3Format(hash.format)(value);
  }

  if (hash.suffix) {
    result = `${result} ${hash.suffix}`;
  }

  if (hash.prefix) {
    result = `${hash.prefix}${result}`;
  }

  return result;
}

export default Helper.helper(format);
