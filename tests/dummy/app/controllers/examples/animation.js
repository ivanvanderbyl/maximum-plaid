import Ember from 'ember';

export default Ember.Controller.extend({

  dataA: { a: 100, b: 50, c: 20 },
  dataB: { a: 200, b: 120, c: 300 },

  data: null,

  actions: {
    toggleDataSets() {
      let data = this.get('data');
      if (data === this.get('dataA')) {
        this.set('data', this.get('dataB'));
      } else {
        this.set('data', this.get('dataA'));
      }
    },

    updateRenderStats(performanceDuration) {
      this.set('performanceDuration', performanceDuration);
    }
  }

});
