import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  shoppingCart: service(),
  count: 1,
  countEqualToOne: computed.eq('count', 1),
  actions: {
    addToCart(product, count) {
      this.get('addOrderLine')(product, count);
    },
    incrementCount() {
      return this.incrementProperty('count');
    },
    decrementQuantity() {
      return this.decrementProperty('count');
    },
  }
});