import {
  create,
  visitable,
  clickable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/products'),
  openProduct: clickable('[data-test-product-thumb-link]'),
  productName: text('[data-test-product-show-name]'),
  openProducts: clickable('[data-test-products-link]')
});
