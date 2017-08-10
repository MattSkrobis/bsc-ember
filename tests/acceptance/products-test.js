import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
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
    await page.products(0).open();
    expect(page.productName).to.include('Personal Computer');

    // edit
    await page.openProducts();
    await page.openProductEdit();
    page.editProductName('Apple 1');
    await page.saveProduct();
    expect(server.db.products[0].name).to.eq('Apple 1');
    await page.openProducts();
    await page.products(0).open();
    expect(page.productName).to.include('Apple 1');

    // new
    await page.openProducts();
    await page.openNewProduct();
    page.editProductName('FNX 45');
    await page.saveProduct();
    expect(server.db.products[1].name).to.eq('FNX 45');
    await page.openProducts();
    await page.products(1).open();
    expect(page.productName).to.include('FNX 45');

    // cancel delete
    await page.openProducts();
    await page.products(1).delete();
    await page.products(1).cancelDelete();
    expect(server.db.products[1].name).to.eq('FNX 45');

    // confirm delete
    await page.products(1).delete();
    await page.products(1).confirmDelete();
    expect(server.db.products[1]).to.not.exist;

  });
});