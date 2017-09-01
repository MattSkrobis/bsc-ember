import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

describe('Integration | Component | product thumb', function() {
  setupComponentTest('product-thumb', {
    integration: true
  });

  beforeEach(function() {
    this.set('product', { name: 'Phone', description: 'Black', sku: 1 });
    this.get('product');
    this.render(hbs`{{product-thumb product=product}}`);
  }),

  it('renders', function() {
    expect(find('[data-test-product-thumb-name]').textContent).to.include('Phone');
  });
});