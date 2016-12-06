import Ember from 'ember';
import { format } from './format';

const { Helper } = Ember;

export function formatFn(params, hash) {
  return function formatFnHelper(value) {
    hash = Object.assign({}, hash);
    hash.format = params[0];
    return format([value], hash);
  };
}

export default Helper.helper(formatFn);
