import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  shoppingCart: service(),
  currentUser: service(),
  count: 1,
  size: 'M',
  countEqualToOne: false,
  init() {
    this._super(...arguments);
    this.set('sizes', ['XS', 'S', 'M', 'L', 'XL']);
    if (this.get('currentUser.user.id')) {
      this.get('shoppingCart.getCartOrder')();
    }
  },
  actions: {
    addToCart() {
      return this.get('shoppingCart').addOrderLine(this.get('model'), this.get('count'), this.get('size'));
    },
    incrementCount() {
      return this.incrementProperty('count');
    },
    decrementCount() {
      return this.decrementProperty('count');
    }
  }
});