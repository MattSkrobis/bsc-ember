import {
  create,
  visitable,
  clickable,
  text,
  fillable,
  collection
} from 'ember-cli-page-object';

export default create({
  products: collection({
    itemScope: '[data-test-product-thumb]',
    item: {
      open: clickable('[data-test-product-thumb-link]'),
      delete: clickable('[data-test-product-destroy-button]'),
      cancelDelete: clickable('[data-test-cancel-button]'),
      confirmDelete: clickable('[data-test-confirm-button]'),
      thumbName: text('[data-test-product-thumb-name]')
    }
  }),
  visit: visitable('/products'),
  productName: text('[data-test-product-show-name]'),
  openProducts: clickable('[data-test-products-link]'),
  edit: clickable('[data-test-product-thumb-edit-link]'),
  editProductName: fillable('input', { at: 0 }),
  saveProduct: clickable('[data-test-product-form-save-button]'),
  openNewProduct: clickable('[data-test-product-index-new-link]')
});
