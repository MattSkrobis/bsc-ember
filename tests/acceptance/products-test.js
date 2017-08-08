import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { find, fillIn } from 'ember-native-dom-helpers';
import startApp from 'bsc-ember/tests/helpers/start-app';
import destroyApp from 'bsc-ember/tests/helpers/destroy-app';
import page from 'bsc-ember/tests/pages/product';

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
    await page.visit();

    // show 
    await page.openProduct();
    expect(page.productName).to.include('Personal Computer');

    // edit
    await page.openProducts();
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