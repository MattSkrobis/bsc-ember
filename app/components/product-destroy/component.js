import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  toast: service('application-toast'),
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
          this.set('toast.message', 'Success!');
          this.get('router').transitionTo('products.index');
        })
        .catch(err => {
          this.set('toast.message', `Error: ${err}`);
        });
    }
  }
});
