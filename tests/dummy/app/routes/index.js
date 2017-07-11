import Ember from 'ember';
import Route from 'ember-route';

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
    controller.setProperties({ responseTimeMean });
  }

});
