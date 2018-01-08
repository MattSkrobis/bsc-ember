import Ember from 'ember';
import { find } from 'lodash';

const { Component, inject: { service }, computed, observer } = Ember;

export default Component.extend({
  shoppingCart: service(),
  products: computed.alias('shoppingCart.mappedProducts'),
  total: computed.alias('shoppingCart.total'),
  totalWithShipping: computed('total', 'selectedShippingOption', function() {
    if (!this.get('selectedShippingOption')) {
      return this.get('total');
    }
    let selectedShippingOption = find(this.get('shippingOptions'), { 'name': this.get('selectedShippingOption') });
    return this.get('total') + selectedShippingOption.value;
  }),
  mappedProductsObserver: observer('shoppingCart.selectedProducts.content', function() {
    this.notifyPropertyChange('shoppingCart.mappedProducts');
  }),
  actions: {
    incrementCount(product) {
      let productId = product.product.get('id');
      return this.incrementProperty(`shoppingCart.selectedProducts.content.${productId}`);
    },
    decrementCount(product) {
      let productId = product.product.get('id');
      return this.decrementProperty(`shoppingCart.selectedProducts.content.${productId}`);
    },
    removeFromCart(product) {
      delete this.get('shoppingCart.selectedProducts.content')[product.product.get('id')];
    }
  },
  init() {
    this._super(...arguments);
    this.set('shippingOptions', [{
      name: 'Poczta Polska',
      value: 10
    }, {
      name: 'SPU',
      value: 12
    }, {
      name: 'PDP',
      value: 11
    }]);
  }
});
