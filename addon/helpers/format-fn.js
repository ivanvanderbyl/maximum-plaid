import Ember from 'ember';
import { format } from './format';

export function formatFn(params, hash) {
  return function formatFnHelper(value) {
    if (!hash) {
      hash = {};
    }
    hash.format = params[0];
    return format([value], hash);
  };
}

export default Ember.Helper.helper(formatFn);
