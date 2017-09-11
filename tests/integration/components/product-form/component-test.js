import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers'; // different find
import startMirage from 'bsc-ember/tests/helpers/setup-mirage-for-integration';

describe('Integration | Component | product form', function() {
  setupComponentTest('product-form', {
    integration: true
  });

  beforeEach(function() {
    startMirage(this.container);
    this.set('categories', [{ name: 'cat' }]);
    this.set('product', { name: 'Phone', description: 'Black', sku: 1 });
    this.render(hbs`{{product-form model=product}}`);
  }),

  afterEach(function() {
    window.server.shutdown();
  });

  it('renders', function() {
    expect(find('[data-test-product-form-name] input').value).to.include('Phone');
  });
});
