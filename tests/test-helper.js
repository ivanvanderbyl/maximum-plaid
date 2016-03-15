import resolver from './helpers/resolver';
import QUnit from 'qunit';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

// Add a custom "approximate" assertion
QUnit.assert.approximate = function(number, expected, message, error = 0.000001) {
  let result = number === expected || Math.abs(number - expected) < error || false;
  QUnit.push(result, number, expected, message);
};
