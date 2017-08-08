import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'bsc-ember/tests/helpers/start-app';
import destroyApp from 'bsc-ember/tests/helpers/destroy-app';
import { visit, find, fillIn } from 'ember-native-dom-helpers';

describe('Acceptance | products', function() {
  this.timeout(0);
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit products page and go to product detail page', async function() {
    server.create('product', { name: 'Personal Computer' });
    await visit('/products');

    // show 
    await click('[data-test-product-thumb-link]');
    expect(find('[data-test-product-show-name]').textContent)
      .to.include('Personal Computer');
    await click('[data-test-products-link]');

    // edit
    await click('[data-test-product-thumb-edit-link]');
    fillIn('[data-test-product-form-name]', 'Apple 1');
    await click('[data-test-product-form-save-button]');
    expect(server.db.products[0].name).to.eq('Apple 1');
    await click('[data-test-products-link]');
    await click('[data-test-product-thumb-link]');
    expect(find('[data-test-product-show-name]').textContent)
      .to.include('Apple 1');
  });
});