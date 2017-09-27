import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  shoppingCart: service(),
  quantity: 1,
  lessThanOne: computed.lt('quantity', 1),
  products: computed.alias('shoppingCart.selectedProducts'),

  moreThanInStock: computed('quantity', function() {
    return this.get('product.quantity') <= this.get('quantity');
  }),
  buttonDisabled: computed('quantity', 'lessThanOne', function() {
    return (this.get('product.quantity') < this.get('quantity')) || this.get('lessThanOne');
  }),

  actions: {
    incrementQuantity() {
      return this.set('quantity', this.get('quantity') + 1);
    },
    decrementQuantity() {
      return this.set('quantity', this.get('quantity') - 1);
    },
    addToCart(product) {
      return this.set(`products.${product.get('id')}`, this.get('quantity'));
    },
    removeFromCart(product) {
      delete this.get('products')[product.get('id')];
    }
  }
});
