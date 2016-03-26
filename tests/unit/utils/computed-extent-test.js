import Ember from 'ember';
import computedExtent from 'dummy/utils/computed-extent';
import { module, test } from 'qunit';

module('Unit | Utility | computed extent');

// Replace this with your real tests.
test('it computes the extent of an array of numbers', function(assert) {
  let TestSubject = Ember.Object.extend({
    values: [1,2,3,4,5,6,7,8,9,10],

    extentOfNumbers: computedExtent('values.[]'),
  });

  let subject = TestSubject.create();
  assert.deepEqual(subject.get('extentOfNumbers'), [1,10], 'includes start and end');
});

test('it can accept a primitive', function(assert) {
  let TestSubject = Ember.Object.extend({
    width: 510,

    xRange: computedExtent(0, 'width'),
  });

  let subject = TestSubject.create();
  assert.deepEqual(subject.get('xRange'), [0, 510], 'includes 0 to width');
});

test('it can accept multiple dependent keys', function(assert) {
  let TestSubject = Ember.Object.extend({
    x1: 100,
    x2: 150,

    xRange: computedExtent(0, 'x1', 'x2'),
  });

  let subject = TestSubject.create();
  assert.deepEqual(subject.get('xRange'), [0, 150], 'includes 0 to x2');
});
