import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-bar-stacked', 'Integration | Component | plaid bar stacked', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{plaid-bar-stacked}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#plaid-bar-stacked}}
      template block text
    {{/plaid-bar-stacked}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
