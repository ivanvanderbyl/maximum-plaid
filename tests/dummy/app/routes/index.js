import Ember from 'ember';
import Route from 'ember-route';
import { task, timeout } from 'ember-concurrency';

const {
  inject,
  RSVP: { Promise },
  String: { camelize }
} = Ember;

export default Route.extend({
  firebase: inject.service(),

  model() {
    let ref = this.get('firebase');

    return new Promise((resolve, reject) => {
      ref.once('value', function(snapshot) {
        let value = snapshot.val();
        let data = {};
        Object.keys(value).forEach((key) => {
          data[camelize(key)] = value[key];
        });

        resolve(data);
      }, reject);
    });

  },

  setupController(controller, { responseTimeMean }) {
    // this.signwaveGenerator();
    // controller.setProperties({ responseTimeMean: this.signwaveGenerator() });
    this.get('peekNextData').perform(controller, responseTimeMean);
    // this.get('refreshData').perform(controller);
  },

  signwaveGenerator() {
    let i = -1;
    let points = 1000;
    let data = [];
    while (++i < points) {
      let y = Math.sin(2 * Math.PI * i);
      let x = i;
      data.push({ timestamp: x, value: y });
    }
    console.log(data);

    return data;
  },

  peekNextData: task(function* (controller, data) {
    let peekWindow = 50;
    let i = peekWindow;
    let currentData = data.slice(0, peekWindow);

    while (true) {
      yield timeout(1e3);
      currentData = currentData.concat(data.slice(i, i + 1));
      if (currentData.length >= peekWindow) {
        currentData = currentData.slice(currentData.length - peekWindow, currentData.length);
      }

      if (i === data.length) {
        i = peekWindow;
        currentData = data.slice(0, peekWindow);
      } else {
        i++;
      }

      controller.set('responseTimeMean', currentData);
    }
  }),

  refreshData: task(function* (controller) {
    while (true) {
      yield timeout(1e3);

      let fuelEconomy = [
        { mpg: Math.random() * 12, vehicles: Math.random() * 580 },
        { mpg: Math.random() * 15, vehicles: Math.random() * 420 },
        { mpg: Math.random() * 18, vehicles: Math.random() * 1000 },
        { mpg: Math.random() * 21, vehicles: Math.random() * 805 },
        { mpg: Math.random() * 24, vehicles: Math.random() * 640 },
        { mpg: Math.random() * 27, vehicles: Math.random() * 400 },
        { mpg: Math.random() * 30, vehicles: Math.random() * 380 },
        { mpg: Math.random() * 33, vehicles: Math.random() * 240 },
        { mpg: Math.random() * 36, vehicles: Math.random() * 210 },
        { mpg: Math.random() * 39, vehicles: Math.random() * 180 },
        { mpg: Math.random() * 42, vehicles: Math.random() * 205 }
      ];

      controller.setProperties({ fuelEconomy });
    }
  })

});
