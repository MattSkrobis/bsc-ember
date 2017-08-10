import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  'data-test-product-thumb': true,
  attributeBindings: ['data-test-product-thumb'], // set binding on the components main div
  actions: {
    destroy(product) {
      product.deleteRecord();
      product.save();
    }
  }
});
