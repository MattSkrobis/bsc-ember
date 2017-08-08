import {
  create,
  visitable,
  clickable,
  text,
  fillable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/products'),
  openProduct: clickable('[data-test-product-thumb-link]'),
  productName: text('[data-test-product-show-name]'),
  openProducts: clickable('[data-test-products-link]'),
  openProductEdit: clickable('[data-test-product-thumb-edit-link]'),
  editProductName: fillable('input', { at: 0 }),
  saveProduct: clickable('[data-test-product-form-save-button]')
});
