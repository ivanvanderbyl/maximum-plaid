import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import {symbolCircle } from 'd3-shape';

moduleForComponent('plaid-symbol', 'Integration | Component | plaid symbol', {
  integration: true
});

test('it renders a diamond', function(assert) {
  this.render(hbs`{{primitive-symbol type="diamond" size="48"}}`);
  assert.equal(this.$('path').attr('d'), 'M0,-6.4474195909412515L3.7224194364083982,0L0,6.4474195909412515L-3.7224194364083982,0Z');
  assert.ok(Ember.A(this.$('path').attr('class').split(' ')).contains('diamond'), 'has diamond class');
  assert.ok(Ember.A(this.$('path').attr('class').split(' ')).contains('symbol'), 'has symbol class');
});

test('positioning', function(assert) {
  this.render(hbs`{{primitive-symbol type="diamond" size="48" left="24" top="100"}}`);
  assert.equal(this.$('path').attr('transform'), 'translate(24,100)');
});

test('fill, stroke, and stroke-width', function(assert) {
  this.render(hbs`{{primitive-symbol fill="red" stroke="black" strokeWidth="2"}}`);
  assert.equal(this.$('path.symbol').attr('fill'), 'red');
  assert.equal(this.$('path.symbol').attr('stroke'), 'black');
  assert.equal(this.$('path.symbol').attr('stroke-width'), '2');
});

test('type as function', function(assert) {
  this.set('symbol', symbolCircle);

  this.render(hbs`{{primitive-symbol type=symbol size="48"}}`);
  assert.equal(this.$('path').attr('d'), 'M3.9088200952233594,0A3.9088200952233594,3.9088200952233594,0,1,1,-3.9088200952233594,0A3.9088200952233594,3.9088200952233594,0,1,1,3.9088200952233594,0');
});
