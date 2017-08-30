import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(params) {
    return {
      product: this.store.find('product', params.product_id),
      newPicture: this.store.createRecord('picture')
    };
  },
  afterModel() {
    this.store.findAll('category');
  }
});
