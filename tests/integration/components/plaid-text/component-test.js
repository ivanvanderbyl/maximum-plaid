import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('plaid-text', 'Integration | Component | plaid text', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{plaid-text "Label Value"}}`);

  assert.equal(this.$().text().trim(), 'Label Value');
});
