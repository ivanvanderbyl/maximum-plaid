import Ember from 'ember';
import CoordinatesMixin from 'maximum-plaid/mixins/coordinates';
import { module, test } from 'qunit';

module('Unit | Mixin | coordinates');

// Replace this with your real tests.
test('it works', function(assert) {
  let CoordinatesObject = Ember.Object.extend(CoordinatesMixin);
  let subject = CoordinatesObject.create();
  assert.ok(subject);
});
