import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    destroy(product) {
      product.deleteRecord();
      product.save();
    }
  }
});
