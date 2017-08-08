import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | product edit', function() {
  setupComponentTest('product-edit', {
    integration: true
  });

  it('renders', function() {
    this.set('product', { name: 'Phone', description: 'Black', sku: 1 });
    this.render(hbs`{{product-edit product=product}}`);
    expect(find('[data-test-product-form-name]').value).to.include('Phone');
  });
});
