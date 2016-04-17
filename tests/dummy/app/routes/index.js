import Ember from 'ember';

let baseTimestamp = (new Date()).valueOf();

export default Ember.Route.extend({

  randomDataPoints() {
    let n = 2;
    let i = 0;
    let dataPoints = [];

    while (++i < n) {
      let timestamp = baseTimestamp + (i * 1e3);
      let value = Math.random() * 30;
      dataPoints.push({timestamp, value});
    }

    baseTimestamp = baseTimestamp + n * 1e3;

    return dataPoints;
  },

  model() {
    return this.randomDataPoints();
  },

  setupController(controller, dataPoints) {
    let plotArea = {
      width: [0, 720],
      height: [0, 240],
      outerWidth: 720,
      outerHeight: 240,
    };

    setInterval(() => {
      dataPoints = dataPoints.concat(this.randomDataPoints());

      if (dataPoints.length > 100) {
        dataPoints = dataPoints.slice(-100, -1);
      }

      controller.set('dataPoints', dataPoints);
    }, 1000/60);

    controller.set('dataPoints', dataPoints);
    controller.set('plotArea', plotArea);
  }
});
