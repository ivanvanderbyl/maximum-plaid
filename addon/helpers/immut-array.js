import Ember from 'ember';
const {
  Helper,
  A: emberArray,
  observer,
  isArray,
  set
} = Ember;

export default Helper.extend({
  compute([array]) {
    if (!isArray(array)) {
      return emberArray([array]);
    }

    set(this, 'array', array);
    return emberArray(array.slice(0));
  },

  arrayContentDidChange: observer('array.[]', function() {
    this.recompute();
  })
});
