import Ember from 'ember';
import _ from 'lodash/lodash';

export function letterFrequency([string]) {
  let chars = _.countBy((string || '').split(''), (char) => char.toLowerCase());
  return _.map(chars, (count, char) => {
    return { count, char }
  });
}

export default Ember.Helper.helper(letterFrequency);
