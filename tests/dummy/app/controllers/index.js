import Controller from 'ember-controller';
import Ember from 'ember';
import computed from 'ember-computed';
import { poissonDiscSampler } from 'maximum-plaid/helpers/poisson-disc-sampler';

export default Ember.Controller.extend({

export default Controller.extend({

  responseTimeMean: [],

  donutData: [
    { timestamp: 1450345920000, value: 1, projectId: 200 },
    { timestamp: 1450345930000, value: 2, projectId: 200 },
    { timestamp: 1450345940000, value: 3, projectId: 200 },
    { timestamp: 1450345950000, value: 4, projectId: 200 },
    { timestamp: 1450345960000, value: 5, projectId: 200 }
  ],

  fuelEconomy: [],

  colorChartData: computed({
    get() {
      let width = 664;
      let height = 220;
      let radius = 30;

      let sampler = poissonDiscSampler([width + radius * 2, height + radius * 2, radius]);
      let samples = [];
      let sample;
      while (sample = sampler()) {
        samples.push([sample[0] - radius, sample[1] - radius]);
      }

      return samples;
    }
  }),

  actions: {
    showBarPreview(...args) {
      console.log(args);
    },

    toggleBarSelect(...args) {
      console.log(args);
      // this.set('selectedBar', id);
    }
  }

});
