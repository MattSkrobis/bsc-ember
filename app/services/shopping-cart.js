import Ember from 'ember';

const { Service, computed, inject: { service } } = Ember;

export default Service.extend({
  store: service(),
  selectedProducts: {},
  products: computed('selectedProducts.[]', function() {
    let products = [];
    if (Object.keys(this.get('selectedProducts')).length) {
      products = this.get('store').query('product',
        { filter: { selectedIds: Object.keys(this.get('selectedProducts')) }
        });
    }
    return products;
  }),
  mappedProducts: computed.map('products', function(_product) {
    return { product: _product, inCartCount: this.get(`selectedProducts.${_product.id}`) };
  }),
  actions: {
    removeFromCart(product) {
      delete this.get('selectedProducts')[product.get('id')];
    }
  }
});
