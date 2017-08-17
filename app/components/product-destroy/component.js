import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    toggle() {
      this.toggleProperty('confirmShown');
    },

    destroy(product) {
      product.deleteRecord();
      product.save();
    }
  }
});
