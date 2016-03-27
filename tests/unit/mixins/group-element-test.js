import Ember from 'ember';
import GroupElementMixin from 'maximum-plaid/mixins/group-element';
import { module, test } from 'qunit';

module('Unit | Mixin | group element');

// Replace this with your real tests.
test('it works', function(assert) {
  let GroupElementObject = Ember.Object.extend(GroupElementMixin);
  let subject = GroupElementObject.create();
  assert.ok(subject);
});
