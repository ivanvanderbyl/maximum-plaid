import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Controller.extend({
  selectedColor: '',
  colors: 5,
  hues: 5,
  halfHues: computed('hues', function() {
    return Math.round(get(this, 'hues') / 2);
  })
});
