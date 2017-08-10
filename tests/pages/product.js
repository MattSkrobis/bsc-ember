import {
  create,
  visitable,
  clickable,
  text,
  fillable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/products'),
  openProduct: clickable('[data-test-product-thumb-link]', { at: 0 }),
  openCreatedProduct: clickable('[data-test-product-thumb-link]', { at: 1 }),
  productName: text('[data-test-product-show-name]'),
  openProducts: clickable('[data-test-products-link]'),
  openProductEdit: clickable('[data-test-product-thumb-edit-link]'),
  editProductName: fillable('input', { at: 0 }),
  saveProduct: clickable('[data-test-product-form-save-button]'),
  openNewProduct: clickable('[data-test-product-index-new-link]')
});
