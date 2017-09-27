import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  shoppingCart: service(),
  products: computed.alias('shoppingCart.mappedProducts'),
  total: computed.alias('shoppingCart.total'),

  actions: {
    incrementCount(product) {
      let productId = product.product.get('id');
      this.set(`products.${productId}`,
        this.get('products')[productId] + 1);
    },
    decrementCount(product) {
      let productId = product.product.get('id');
      this.set(`products.${productId}`,
        this.get('products')[productId] - 1);
    }
  }
});
