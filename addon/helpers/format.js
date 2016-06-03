import Ember from 'ember';
import {format as d3Format} from 'd3-format';

export function format([value], hash) {
  if (!hash) {
    hash = {};
  }

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

export default Ember.Helper.helper(format);
