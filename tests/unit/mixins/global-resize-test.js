import Ember from 'ember';
import GlobalResizeMixin from 'maximum-plaid/mixins/global-resize';
import { module, test } from 'qunit';

module('Unit | Mixin | global resize');

// Replace this with your real tests.
test('it works', function(assert) {
  let GlobalResizeObject = Ember.Object.extend(GlobalResizeMixin);
  let subject = GlobalResizeObject.create();
  assert.ok(subject);
});
