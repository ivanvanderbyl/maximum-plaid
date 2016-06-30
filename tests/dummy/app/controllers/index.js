import Controller from 'ember-controller';

export default Controller.extend({

  responseTimeMean: [],

  donutData: [
    { timestamp: 1450345920000, value: 1, projectId: 200 },
    { timestamp: 1450345930000, value: 2, projectId: 200 },
    { timestamp: 1450345940000, value: 3, projectId: 200 },
    { timestamp: 1450345950000, value: 4, projectId: 200 },
    { timestamp: 1450345960000, value: 5, projectId: 200 }
  ],

  fuelEconomy: []

});
