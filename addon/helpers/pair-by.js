import Ember from 'ember';

const { assert } = Ember;

/**
 * @pairBy(params);
 *
 * Creates a pair of values from an array of objects.
 *
 * Usage:
 *
 *   (pair-by "timestamp" "value" someArrayOfObjects)
 *   // => [[1450345920000, 1885], [1450345920000, 1885], ...]
 *
 * @param  {Array[...keys, data]} params
 * @public
 * @return {Array[Array[2]]}
 */
export function pairBy(params) {
  assert('pair-by requires at least 2 arguments: key, data', params.length >= 2);
  let data = params.pop();
  assert('last argument must be an array of objects', Ember.isArray(data));

  let [...keys] = params;

  return data.map((d) => {
    return keys.reduce((acc, k, index) => {
      acc[index] = d[k];
      return acc;
    }, []);
  });
}

export default Ember.Helper.helper(pairBy);
