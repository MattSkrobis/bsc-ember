import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service(),
  actions: {
    toggle() {
      this.toggleProperty('confirmShown');
    },

    destroy(product) {
      product.deleteRecord();
      product
        .save()
        .then(() => {
          this.get('router').transitionTo('products.index');
        })
        .catch(err => {
          alert(err);
        });
    }
  }
});
