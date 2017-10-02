import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const { Service, computed, inject: { service }, observer } = Ember;

export default Service.extend({
  store: service(),
  selectedProducts: storageFor('shoppingCart'),

  productObserver: observer('selectedProducts.content.[]', function() {
    this.notifyPropertyChange('products');
  }),

  itemsInShoppingCart: computed.sum('itemsCount'),
  total: computed.sum('productPrices'),

  products: computed('selectedProducts.content.[]', function() {
    debugger
    let products = [];
    if (Object.keys(this.get('selectedProducts.content')).length) {
      products = this.get('store').query('product', {
        filter: { selectedIds: Object.keys(this.get('selectedProducts.content'))
        }
      });
    }
    return products;
  }),
  mappedProducts: computed.map('products', function(_product) {
    return { product: _product, inCartCount: this.get(`selectedProducts.${_product.id}`) };
  }),
  itemsCount: computed.map('mappedProducts.[]', function(product) {
    return product.inCartCount;
  }),
  productPrices: computed('mappedProducts.[]', function() {
    return this.get('mappedProducts').map(function(object) {
      return object.product.get('price') * object.inCartCount;
    });
  })
  // mappedProducts: computed.map('selectedProducts', function(_product) {
  //   return { product: _product, inCartCount: this.get(`selectedProducts.${_product.id}`) };
  // })
});
