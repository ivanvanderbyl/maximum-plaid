import Ember from 'ember';
import DimensionsMixin from 'maximum-plaid/mixins/dimensions';
import { module, test } from 'qunit';

module('Unit | Mixin | dimensions');

// Replace this with your real tests.
test('it works', function(assert) {
  let DimensionsObject = Ember.Object.extend(DimensionsMixin);
  let subject = DimensionsObject.create();
  assert.ok(subject);
});
