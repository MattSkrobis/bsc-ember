import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | product show', function() {
  setupComponentTest('product-show', {
    integration: true
  });

  it('renders', function() {
    this.set('product', { name: 'Phone', description: 'Black', sku: 1 });
    this.render(hbs`{{product-show product=product}}`);
    expect(find('[data-test-product-show-name]').textContent).to.include('Phone');
  });
});
