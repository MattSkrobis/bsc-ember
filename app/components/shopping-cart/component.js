import Ember from 'ember';

const { Component, inject: { service }, computed, observer } = Ember;

export default Component.extend({
  shoppingCart: service(),
  products: computed.alias('shoppingCart.mappedProducts'),
  total: computed.alias('shoppingCart.total'),
  mappedProductsObserver: observer('shoppingCart.selectedProducts.content', function() {
    debugger
    this.notifyPropertyChange('shoppingCart.mappedProducts');
  }),
  actions: {
    incrementCount(product) {
      let productId = product.product.get('id');
      return this.incrementProperty(`shoppingCart.selectedProducts.content.${productId}`);
    },
    decrementCount(product) {
      let productId = product.product.get('id');
      debugger
      return this.decrementProperty(`shoppingCart.selectedProducts.content.${productId}`);
    },
    removeFromCart(product) {
      debugger
      delete this.get('shoppingCart.selectedProducts.content')[product.product.get('id')];
    }
  }
});
