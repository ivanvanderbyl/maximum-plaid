import Ember from 'ember';
import PlotAreaMixin from 'maximum-plaid/mixins/plot-area';
import { module, test } from 'qunit';

module('Unit | Mixin | plot area');

// Replace this with your real tests.
test('returns computed area for plot', function(assert) {
  let PlotAreaObject = Ember.Object.extend(PlotAreaMixin, {
    margin: '10 20'
  });

  let subject = PlotAreaObject.create();
  assert.equal(subject.get('plotArea.top'), 10, 'plotArea.top');
  assert.equal(subject.get('plotArea.left'), 20, 'plotArea.left');
});

test('accepts object with margin', function(assert) {
  let PlotAreaObject = Ember.Object.extend(PlotAreaMixin, {
    margin: {top: 10, left: 20},
    height: 200,
    width: 200,
  });

  let subject = PlotAreaObject.create();
  assert.equal(subject.get('plotArea.top'), 10, 'plotArea.top');
  assert.equal(subject.get('plotArea.left'), 20, 'plotArea.left');
  assert.equal(subject.get('plotArea.right'), 200, 'plotArea.right');
  assert.equal(subject.get('plotArea.bottom'), 190, 'plotArea.bottom');
});

