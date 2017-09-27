import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Service, computed, inject: { service } } = Ember;

export default Service.extend({
  store: service(),
  selectedProducts: storageFor('shoppingCart'),

  itemsInShoppingCart: computed.sum('itemsCount'),
  total: computed.sum('productPrices'),

  products: computed('selectedProducts.content.[]', function() {
    let products = [];
    if (Object.keys(this.get('selectedProducts.content')).length) {
      products = this.get('store').query('product', {
        filter: { selectedIds: Object.keys(this.get('selectedProducts.content'))
        }
      });
    }
    return products;
  }),
  itemsCount: computed.map('mappedProducts.[]', function(product) {
    return product.inCartCount;
  }),
  productPrices: computed('mappedProducts.[]', function() {
    return this.get('mappedProducts').map(function(object) {
      return object.product.get('price') * object.inCartCount;
    });
  }),
  mappedProducts: computed.map('products', function(_product) {
    return { product: _product, inCartCount: this.get(`selectedProducts.${_product.id}`) };
  })
});
