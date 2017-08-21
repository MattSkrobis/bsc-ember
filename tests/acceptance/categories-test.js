import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import startApp from 'bsc-ember/tests/helpers/start-app';
import destroyApp from 'bsc-ember/tests/helpers/destroy-app';
import page from 'bsc-ember/tests/pages/category';

describe('Acceptance | categories', function() {
  this.timeout(0);
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /categories', async function() {
    server.create('category', { name: 'Cheap' });
    await page.visit();

    // show
    await page.categories(0).open();
    expect(page.categoryName).to.eq('Cheap');

    // edit
    await page.edit().editCategoryName('Expensive').saveCategory();
    expect(server.db.categories[0].name).to.eq('Expensive');
    expect(page.categories(0).thumbName).to.eq('Expensive');

    // new
    await page.openNewCategory().saveCategory();
    expect(server.db.categories[1]).to.not.exist;
    expect(page.editCategoryNameError).to.contain('Name');
    await page.editCategoryName('Exquisite').saveCategory();
    expect(page.categories(1).thumbName).to.include('Exquisite');

    // cancel delete
    await page.categories(1).open();
    await page.delete().cancelDelete();
    expect(server.db.categories[1].name).to.eq('Exquisite');

    // confirm delete
    await page.delete().confirmDelete();
    expect(server.db.categories[1]).to.not.exist;
    expect(page.categories().count).to.eq(1);
  });
});
