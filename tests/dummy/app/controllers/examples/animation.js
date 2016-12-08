import Ember from 'ember';

export default Ember.Controller.extend({

  dataA: { value: 100 },
  dataB: { value: 200 },

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
