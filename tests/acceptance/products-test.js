import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'bsc-ember/tests/helpers/start-app';
import destroyApp from 'bsc-ember/tests/helpers/destroy-app';
import { visit, find } from 'ember-native-dom-helpers';

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
    await click('[data-test-product-thumb-link]');
    expect(find('[data-test-product-show-name]').textContent)
      .to.include('Personal Computer');
  });
});