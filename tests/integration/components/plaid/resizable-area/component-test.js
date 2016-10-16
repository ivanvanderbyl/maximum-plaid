import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid/resizable-area', 'Integration | Component | plaid/resizable area', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{plaid/resizable-area}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#plaid/resizable-area}}
      template block text
    {{/plaid/resizable-area}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
