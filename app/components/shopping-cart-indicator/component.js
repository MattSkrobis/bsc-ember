import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  shoppingCart: service(),
  count: computed('shoppingCart.order.firstObject.orderLines.[]', function() {
    return this.get('shoppingCart').inCartCount();
  })
});
