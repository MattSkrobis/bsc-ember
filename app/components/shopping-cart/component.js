import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  shoppingCart: service(),
  actions: {
    incrementCount(product) {
      let productId = product.product.get('id');
      console.log(this.get('shoppingCart.selectedProducts')[productId]);
      this.set(`shoppingCart.selectedProducts.${productId}`,
        this.get('shoppingCart.selectedProducts')[productId] + 1);
    },
    decrementCount(product) {
      let productId = product.product.get('id');
      console.log(this.get('shoppingCart.selectedProducts')[productId]);
      this.set(`shoppingCart.selectedProducts.${productId}`,
        this.get('shoppingCart.selectedProducts')[productId] - 1);
    }
  }
});
