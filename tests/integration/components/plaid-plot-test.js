import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-plot', 'Integration | Component | plaid plot', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{plaid-plot}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#plaid-plot}}
      template block text
    {{/plaid-plot}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it contains a single wrapping <g> element when rendered', function(assert) {

  this.render(hbs`{{plaid-plot}}`);
  assert.equal(this.$('g').length, 1, 'wrapping <g> exists in blockless form');

  // Template block usage:
  this.render(hbs`
    {{#plaid-plot}}
      text
    {{/plaid-plot}}
  `);

  assert.equal(this.$('g').length, 1, 'wrapping <g> exists in block form');
});
